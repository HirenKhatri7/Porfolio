import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

interface OutputLine {
  text: string;
  isHTML: boolean;
}

interface TypewriterProps {
  lines: OutputLine[];
  speed?: number;
  onComplete?: () => void;
  onUpdate?: () => void;
}

export default function Typewriter({ lines, speed = 20, onComplete, onUpdate }: TypewriterProps) {
  // lineIndex: which line we're currently typing
  // charIndex: how many chars of that line have been revealed
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      if (!done) {
        setDone(true);
        onComplete?.();
      }
      return;
    }

    const currentLine = lines[lineIndex];

    if (currentLine.isHTML) {
      // HTML lines: reveal the whole line at once, then move to next line
      const timeout = setTimeout(() => {
        setCharIndex(currentLine.text.length);
        // Small delay then advance to next line
        setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
          onUpdate?.();
        }, speed * 2);
      }, speed * 3);
      return () => clearTimeout(timeout);
    } else {
      // Plain text lines: type character by character
      if (charIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
          onUpdate?.();
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Line done, move to next
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }
    }
  }, [lineIndex, charIndex, lines, speed, onComplete, onUpdate, done]);

  // Render all fully revealed lines + the partial current line
  const renderLines = () => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (i > lineIndex) break;

      const line = lines[i];
      const isCurrentLine = i === lineIndex;
      const visibleText = isCurrentLine ? line.text.slice(0, charIndex) : line.text;

      if (line.isHTML) {
        elements.push(
          <span key={i} dangerouslySetInnerHTML={{ __html: visibleText + "\n" }} />
        );
      } else {
        elements.push(<span key={i}>{visibleText + (isCurrentLine ? "" : "\n")}</span>);
      }
    }

    return elements;
  };

  return (
    <span className="whitespace-pre-wrap">
      {renderLines()}
      {!done && <span className="animate-pulse">▌</span>}
    </span>
  );
}