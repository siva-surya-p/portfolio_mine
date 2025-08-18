import { useEffect, useMemo, useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState('dark'); // 'dark' | 'light'
  const [javaVersion, setJavaVersion] = useState(null);

  // Fetch available runtimes and cache latest Java version when needed
  useEffect(() => {
    const maybeFetchJava = async () => {
      if (language !== 'java' || javaVersion) return;
      try {
        const res = await fetch('https://emkc.org/api/v2/piston/runtimes');
        if (!res.ok) return;
        const data = await res.json();
        const javaRuntimes = (data || []).filter(r => String(r.language).toLowerCase() === 'java');
        if (javaRuntimes.length) {
          // Pick the highest semver-ish version by simple string compare fallback
          const best = javaRuntimes.sort((a,b) => String(b.version).localeCompare(String(a.version)))[0];
          setJavaVersion(best.version);
        }
      } catch {
        // Silent fallback; leave version null and rely on default later
      }
    };
    maybeFetchJava();
  }, [language, javaVersion]);

  const runCode = async () => {
    setIsRunning(true);
    try {
      if (language === 'javascript') {
        const logs = [];
        const customConsole = {
          log: (...args) => logs.push(args.map(String).join(' ')),
          error: (...args) => logs.push(args.map(String).join(' ')),
          warn: (...args) => logs.push(args.map(String).join(' ')),
          info: (...args) => logs.push(args.map(String).join(' ')),
        };
        try {
          // Run user code while capturing console and the last expression value
          const fn = new Function('console', `
            let __result__;
            try {
              __result__ = (function(){\n${code}\n})();
            } catch (e) {
              console.error(e);
              throw e;
            }
            return __result__;
          `);
          const result = fn(customConsole);

          const pieces = [];
          if (logs.length) pieces.push(logs.join('\n'));
          if (result !== undefined) pieces.push(String(result));
          setOutput(pieces.join('\n') || '(no output)');
        } catch (err) {
          setOutput(String(err));
        }
      } else if (language === 'java') {
        // Execute Java via Piston API
        const runtimeVersion = javaVersion || '15.0.2';
        const payload = {
          language: 'java',
          version: runtimeVersion,
          files: [
            { name: 'Main.java', content: code || '' }
          ],
          stdin: '',
          args: [],
          compile_timeout: 10000,
          run_timeout: 10000,
        };
        try {
          const res = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          const parts = [];
          if (data?.compile) {
            if (data.compile.stdout) parts.push(data.compile.stdout);
            if (data.compile.stderr) parts.push(data.compile.stderr);
          }
          if (data?.run) {
            if (data.run.stdout) parts.push(data.run.stdout);
            if (data.run.stderr) parts.push(data.run.stderr);
          }
          const text = parts.join('').trim();
          setOutput(text || '(no output)');
        } catch (err) {
          setOutput('Failed to run Java code. ' + String(err));
        }
      } else {
        setOutput('Only JavaScript runs in-browser. Java is supported via a remote runner; other languages need a backend service.');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const toggleEditorTheme = () => setEditorTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const isDark = editorTheme === 'dark';
  const editorBg = isDark ? '#0f172a' : '#f8f9fa';
  const editorText = isDark ? '#e2e8f0' : '#1f2937';
  const panelBg = isDark ? '#0b1220' : '#ffffff';
  const panelText = isDark ? '#cbd5e1' : '#1f2937';
  const cardBg = isDark ? 'var(--dark-secondary)' : '#ffffff';
  const cardBorder = isDark ? '1px solid var(--dark-border)' : '1px solid rgba(0,0,0,0.06)';

  const placeholder = useMemo(() => {
    if (language === 'java') {
      return [
        'Write Java here (class name must be Main):',
        'public class Main {',
        '  public static void main(String[] args) {',
        "    System.out.println(2 + 2);",
        '  }',
        '}'
      ].join('\n');
    }
    return "Write or paste your code here...\nExamples:\nconsole.log('Hello');\n2 + 2;";
  }, [language]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div
            className="shadow-lg rounded-4 p-4"
            style={{ background: cardBg, border: cardBorder, color: panelText }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="fw-bold m-0">Online Code Editor</h2>
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select form-select-sm w-auto"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  title={isDark ? 'Switch to light editor' : 'Switch to dark editor'}
                  onClick={toggleEditorTheme}
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
              </div>
            </div>

            <div className="mb-3 d-flex flex-wrap gap-2 align-items-center justify-content-between">
              <input
                type="file"
                accept=".js,.py,.cpp,.java,.txt"
                className="form-control form-control-sm w-auto"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (evt) => setCode(String(evt.target?.result || ''));
                  reader.readAsText(file);
                }}
              />
              <div className="d-flex gap-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCode('')}
                >
                  Clear
                </button>
                <button
                  className="btn btn-primary btn-sm px-3"
                  onClick={runCode}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running…' : 'Run Code'}
                </button>
              </div>
            </div>

            <textarea
              className="form-control mb-3 code-editor-textarea"
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={placeholder}
              style={{
                fontFamily:
                  'Fira Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                background: editorBg,
                color: editorText,
                borderRadius: '10px',
                border: isDark ? '1px solid var(--dark-border)' : '1px solid #e5e7eb',
              }}
            />

            <div
              className="p-3 rounded-3"
              style={{ background: panelBg, color: panelText, border: isDark ? '1px solid var(--dark-border)' : '1px solid #e5e7eb' }}
            >
              <div className="fw-bold mb-2">Output</div>
              <pre className="m-0" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
