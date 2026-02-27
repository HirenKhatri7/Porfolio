import { useEffect, useRef, useState } from 'react'
import './App.css'
import Typewriter from './components/TypeWriter';
import { executeCommand, BANNER, COMMANDS, type OutputLine, BANNER_MOBILE } from './commands/commands';

interface HistoryEntry {
  command: string;
  output: OutputLine[];
}
function App() {

  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [bannerDone, setBannerDone] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const activeBanner = isMobile ? BANNER_MOBILE : BANNER;


  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setInputValue("");
      return;
    }

    const result = executeCommand(raw);
    setIsTyping(true);
    setHistory((prev) => [...prev, { command: inputValue, output: result.output }])
    setCmdIndex(-1);
    setCmdHistory((prev) => [raw.trim(), ...prev]);
    setInputValue("");
  }



  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!inputValue.trim() || isTyping) return;
      handleCommand(inputValue);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(newIdx);
      setInputValue(cmdHistory[newIdx]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex <= 0) {
        setCmdIndex(-1);
        setInputValue("");
        return;
      }
      const newIdx = cmdIndex - 1;
      setCmdIndex(newIdx);
      setInputValue(cmdHistory[cmdIndex]);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const matches = COMMANDS.filter((cmd) => cmd.startsWith(inputValue.trim().toLowerCase()));

      if (matches.length === 1) {
        setInputValue(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            command: inputValue,
            output: matches.map((m) => ({ text: m, isHTML: false })),
          },
        ]);
      }
    }
  }

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    })
  }

  const handleTerminalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if(isMobile) return;
    if (target.tagName === "A") {
      setTimeout(() => {
        if (!isTyping) inputRef.current?.focus();
      }, 0);
    } else {
      if (!isTyping) inputRef.current?.focus();
    }
  }
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className='root'>
      <div className='flex justify-center items-center bg-[#1a1a1a] text-[#888] title-bar'>
        <div className="title-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span>visitor@portfolio</span>
        <div style={{ width: 52 }} />
      </div>
      <div className='terminal-body' ref={terminalRef} onClick={handleTerminalClick}>
        <div className='mb-2 output pl-0.5'>
          {bannerDone ? (
            <span className="whitespace-pre-wrap">
              {activeBanner.map((line, i) => (
                <span key={i}>{line.text + "\n"}</span>
              ))}
            </span>
          ) : (
            <Typewriter
              lines={BANNER}
              speed={10}
              onComplete={() => {
                setBannerDone(true);
                setIsTyping(false);
                if (!isMobile) inputRef.current?.focus();
              }}
              onUpdate={scrollToBottom}
            />
          )}
        </div>

        {history.map((entry, i) => (
          <div key={i} className='mb-2'>
            <div className='input-line prompt-line'>
              <span className='prompt-user'>visitor@portfolio</span>
              <span className='prompt-sep'>:</span>
              <span className='prompt-dir'>~</span>
              <span className='prompt-dollar'>$ </span>
              <span className=' terminal-input'>{entry.command}</span>
            </div>

            <div className='output mt-1 ml-1'>
              {i === history.length - 1 && isTyping ? (
                <Typewriter
                  lines={entry.output}
                  speed={0}
                  onComplete={() => {
                    setIsTyping(false);
                  }}
                  onUpdate={scrollToBottom}
                />
              ) : entry.output.map((line, j) => line.isHTML ? (
                <span key={j}
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: line.text + "\n" }}
                />
              ) : (
                <span className="whitespace-pre-wrap" key={j}>{line.text + "\n"}</span>
              ))}
            </div>
          </div>
        ))}
        {!isTyping && <div className='prompt-line input-line'>
          <span className='prompt-user'>visitor@portfolio</span>
          <span className='prompt-sep'>:</span>
          <span className='prompt-dir'>~</span>
          <span className='prompt-dollar'>$ </span>
          <input
            className='terminal-input'
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus={!isMobile}
            onKeyDown={onKeyDown}
          />
        </div>}
      </div>

    </div>

  )
}

export default App
