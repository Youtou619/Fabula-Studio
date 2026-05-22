import { useState, useRef, useEffect } from 'react';
import { useProjectData } from '../lib/useProjectData';
import { chaptersService } from '../lib/services';
import type { Character } from '../lib/database.types';
import { Link2, Tag, Loader2 } from 'lucide-react';

interface EditorProps {
  focusMode: boolean;
  projectId: string;
}

export const Editor = ({ focusMode, projectId }: EditorProps) => {
  const { characters, loading: dataLoading } = useProjectData(projectId);
  const [content, setContent] = useState('');
  const [chapterId, setChapterId] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState('Chapitre 1');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [hoveredMention, setHoveredMention] = useState<Character | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const mentionStartRef = useRef<number>(-1);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load chapter on mount
  useEffect(() => {
    const loadChapter = async () => {
      try {
        const chapters = await chaptersService.getAll(projectId);
        if (chapters.length > 0) {
          const ch = chapters[0];
          setChapterId(ch.id);
          setChapterTitle(ch.title);
          setChapterNumber(ch.number);
          setContent(ch.content || '');
        } else {
          // Create first chapter
          const newChapter = await chaptersService.create({
            project_id: projectId,
            title: 'Chapitre 1',
            number: 1,
            content: '',
            status: 'draft',
            word_count: 0,
            metadata: {},
            character_ids: [],
            summary: '',
            event_ids: [],
          });
          setChapterId(newChapter.id);
          setChapterTitle(newChapter.title);
          setChapterNumber(newChapter.number);
        }
      } catch (error) {
        console.error('Error loading chapter:', error);
      }
    };
    loadChapter();
  }, [projectId]);

  const filteredCharacters = characters.filter(c => 
    c.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    c.tags.some(tag => tag.toLowerCase().includes(mentionQuery.toLowerCase()))
  );

  const parseContent = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const mentionRegex = /@([^\s@]+(?:\s[^\s@]+)?)/g;
    let match: RegExpExecArray | null;

    while ((match = mentionRegex.exec(text)) !== null) {
      const m = match;
      const char = characters.find(c => 
        m[1].toLowerCase().includes(c.name.split(' ')[0].toLowerCase()) ||
        c.name.toLowerCase().includes(m[1].toLowerCase())
      );

      if (lastIndex < m.index) {
        parts.push(
          <span key={`text-${lastIndex}`}>{text.slice(lastIndex, m.index)}</span>
        );
      }

      if (char) {
        parts.push(
          <span
            key={`mention-${m.index}`}
            className="fabula-link font-medium"
            onMouseEnter={(e) => {
              setHoveredMention(char);
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              setTooltipPosition({ top: rect.bottom + 8, left: rect.left });
            }}
            onMouseLeave={() => setHoveredMention(null)}
          >
            @{m[1]}
          </span>
        );
      } else {
        parts.push(
          <span key={`text-${m.index}`} className="text-fabula-text-secondary">{m[0]}</span>
        );
      }

      lastIndex = m.index + m[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  const saveContent = async (newContent: string) => {
    if (!chapterId) return;
    
    setIsSaving(true);
    try {
      const wordCount = newContent.trim().split(/\s+/).filter(w => w.length > 0).length;
      await chaptersService.update(chapterId, {
        content: newContent,
        word_count: wordCount,
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving chapter:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);

    // Auto-save debounced
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => saveContent(text), 2000);

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(e.currentTarget);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caretPosition = preCaretRange.toString().length;
    setCursorPosition(caretPosition);

    const beforeCaret = text.slice(0, caretPosition);
    const atIndex = beforeCaret.lastIndexOf('@');
    
    if (atIndex !== -1) {
      const afterAt = beforeCaret.slice(atIndex + 1);
      if (!afterAt.includes(' ') || afterAt.length < 20) {
        mentionStartRef.current = atIndex;
        setMentionQuery(afterAt);
        setShowMentionMenu(true);
        
        const rect = range.getBoundingClientRect();
        const editorRect = e.currentTarget.getBoundingClientRect();
        setMentionPosition({
          top: rect.bottom - editorRect.top + 8,
          left: rect.left - editorRect.left,
        });
      } else {
        setShowMentionMenu(false);
      }
    } else {
      setShowMentionMenu(false);
    }
  };

  const insertMention = (character: Character) => {
    const before = content.slice(0, mentionStartRef.current);
    const after = content.slice(cursorPosition);
    const newContent = `${before}@${character.name} ${after}`;
    setContent(newContent);
    setShowMentionMenu(false);
    setMentionQuery('');
    
    if (editorRef.current) {
      editorRef.current.innerText = newContent;
      const selection = window.getSelection();
      const range = document.createRange();
      const textNode = editorRef.current.firstChild;
      if (textNode) {
        const newPos = mentionStartRef.current + character.name.length + 2;
        range.setStart(textNode, newPos);
        range.setEnd(textNode, newPos);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    
    // Auto-save after mention
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => saveContent(newContent), 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showMentionMenu) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedMentionIndex(prev => (prev + 1) % filteredCharacters.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedMentionIndex(prev => (prev - 1 + filteredCharacters.length) % filteredCharacters.length);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (filteredCharacters[selectedMentionIndex]) {
        insertMention(filteredCharacters[selectedMentionIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowMentionMenu(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  if (dataLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-fabula-accent" />
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col transition-all duration-500 ${focusMode ? 'bg-fabula-bg dark:bg-fabula-bg-dark' : ''}`}>
      {/* Header */}
      {!focusMode && (
        <div className="flex items-center justify-between px-8 py-4 border-b border-fabula-border dark:border-fabula-border-dark">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{chapterTitle}</h1>
            <p className="text-xs text-fabula-text-secondary mt-0.5">Chapitre {chapterNumber}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-fabula-text-secondary">
            <span>{content.trim().split(/\s+/).filter(w => w.length > 0).length} mots</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              {isSaving ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sauvegarde...
                </>
              ) : lastSaved ? (
                <>Sauvegardé {lastSaved.toLocaleTimeString()}</>
              ) : (
                'Non sauvegardé'
              )}
            </span>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide ${focusMode ? 'flex items-center justify-center' : ''}`}>
        <div className={`relative ${focusMode ? 'max-w-2xl w-full px-8' : 'max-w-3xl mx-auto px-8 py-12'}`}>
          {!focusMode && (
            <div className="fabula-editor">
              <h1>{chapterTitle}</h1>
            </div>
          )}
          
          <div
            ref={editorRef}
            className={`
              fabula-editor text-lg leading-relaxed outline-none
              ${focusMode ? 'text-xl leading-loose' : ''}
            `}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            style={{ minHeight: '60vh' }}
          >
            {parseContent(content)}
          </div>

          {/* Menu de mentions */}
          {showMentionMenu && filteredCharacters.length > 0 && (
            <div
              className="absolute z-50 w-72 bg-white dark:bg-fabula-surface-dark rounded-xl shadow-float dark:shadow-float-dark border border-fabula-border dark:border-fabula-border-dark overflow-hidden"
              style={{ top: mentionPosition.top, left: mentionPosition.left }}
            >
              <div className="px-3 py-2 text-xs font-medium text-fabula-text-secondary border-b border-fabula-border dark:border-fabula-border-dark">
                Lier une fiche
              </div>
              {filteredCharacters.map((char, index) => (
                <button
                  key={char.id}
                  onClick={() => insertMention(char)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors
                    ${index === selectedMentionIndex 
                      ? 'bg-fabula-accent-subtle' 
                      : 'hover:bg-gray-50 dark:hover:bg-fabula-surface'
                    }
                  `}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: char.color }}
                  >
                    {char.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{char.name}</div>
                    <div className="text-xs text-fabula-text-secondary truncate">{char.role}</div>
                  </div>
                  <Link2 className="w-3.5 h-3.5 text-fabula-text-secondary flex-shrink-0" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tooltip au survol */}
      {hoveredMention && (
        <div
          className="fixed z-50 w-72 bg-white dark:bg-fabula-surface-dark rounded-xl shadow-float dark:shadow-float-dark border border-fabula-border dark:border-fabula-border-dark p-4 pointer-events-none"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          <div className="flex items-start gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
              style={{ backgroundColor: hoveredMention.color }}
            >
              {hoveredMention.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{hoveredMention.name}</h4>
              <p className="text-xs text-fabula-accent font-medium mt-0.5">{hoveredMention.role}</p>
            </div>
          </div>
          <p className="text-xs text-fabula-text-secondary mt-3 leading-relaxed line-clamp-3">
            {hoveredMention.description || 'Aucune description.'}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {hoveredMention.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fabula-accent-subtle text-fabula-accent text-[10px] font-medium">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
