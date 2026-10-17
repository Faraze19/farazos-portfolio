import { useEffect, useRef, useState } from "react";
import { runCommand } from "../lib/terminal";
export function Terminal() {
  const [lines, setLines] = useState([
    {
      command: "",
      output:
        "FarazOS [Version 0.1.0]\nWelcome, explorer. Type help to get started.\nSafe simulation · no system access",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);
  return (
    <div className="terminal">
      <div className="terminal-tag">
        <span className="status-dot" /> LOCAL SIMULATION
      </div>
      <div role="log" aria-label="Terminal output" aria-live="polite">
        {lines.map((line, i) => (
          <div className="terminal-entry" key={i}>
            {line.command && (
              <div>
                <span className="prompt">faraz@farazos:~$</span> {line.command}
              </div>
            )}
            <pre>{line.output}</pre>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setHistory([...history, input]);
          setCursor(history.length + 1);
          setLines(
            input.trim().toLowerCase() === "clear"
              ? []
              : [...lines, { command: input, output: runCommand(input) }],
          );
          setInput("");
        }}
      >
        <label htmlFor="command" className="prompt">
          faraz@farazos:~$
        </label>
        <input
          id="command"
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault();
              const next = Math.max(
                0,
                Math.min(
                  history.length,
                  cursor + (e.key === "ArrowUp" ? -1 : 1),
                ),
              );
              setCursor(next);
              setInput(history[next] ?? "");
            }
          }}
        />
      </form>
      <div ref={end} />
    </div>
  );
}
