import { useState, useRef } from 'react';
import { mockCharacters } from '../data/mockData';
import type { Character } from '../data/mockData';
import { Link2, Tag } from 'lucide-react';

interface EditorProps {
  focusMode: boolean;
}

export const Editor: React.FC<EditorProps> = ({ focusMode }) => {
  const [content, setContent] = useState(
    `Aeliana s'approcha lentement du grand portail d'obsidienne. Le silence de la @Citadelle des Ombres n'était troublé que par le crépitement des torches éternelles.\n\nElle savait que @Kaelen Thorne l'attendait de l'autre côté, mais ce qui l'inquiétait davantage, c'était le message reçu de @Mira Soleil.\n\n« Les archives ne mentent jamais, » avait dit @Orion Vane. Mais Aeliana commençait à comprendre que la vérité pouvait être plus dangereuse que les mensonges.\n\nSon chemin la mènerait bientôt dans les tréfonds de l'@Undercity, là où les mécanismes anciens murmuraient encore les secrets d'un royaume oublié.`
  );
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [hoveredMention, setHoveredMention] = useState<Character | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const mentionStartRef = useRef<number>(-1);

  const filteredCharacters = mockCharacters.filter(c => 
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
      const char = mockCharacters.find(c => 
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

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);

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

  return (
    <div className={`h-full flex flex-col transition-all duration-500 ${focusMode ? 'bg-fabula-bg dark:bg-fabula-bg-dark' : ''}`}>
      {/* Header du manuscrit */}
      {!focusMode && (
        <div className="flex items-center justify-between px-8 py-4 border-b border-fabula-border dark:border-fabula-border-dark">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Les Archives d'Aether</h1>
            <p className="text-xs text-fabula-text-secondary mt-0.5">Chapitre 3 — L'Ombre du Passé</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-fabula-text-secondary">
            <span>1,247 mots</span>
            <span>·</span>
            <span>3 fiches liées</span>
          </div>
        </div>
      )}

      {/* Zone d'édition */}
      <div className={`flex-1 overflow-y-auto scrollbar-hide ${focusMode ? 'flex items-center justify-center' : ''}`}>
        <div className={`relative ${focusMode ? 'max-w-2xl w-full px-8' : 'max-w-3xl mx-auto px-8 py-12'}`}>
          {!focusMode && (
            <div className="fabula-editor">
              <h1>Les Archives d'Aether</h1>
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
            {hoveredMention.description}
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
