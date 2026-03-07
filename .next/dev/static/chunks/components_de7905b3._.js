(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Terminal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HOME_SEQUENCES",
    ()=>HOME_SEQUENCES,
    "Terminal",
    ()=>Terminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Terminal({ sequences, title = "terminal", loop = true }) {
    _s();
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [typing, setTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showCursor, setShowCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [seqIdx, setSeqIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lineIdx, setLineIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [charIdx, setCharIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("typing");
    const seq = sequences[seqIdx] || [];
    const currentLine = seq[lineIdx];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            if (phase === "done") {
                const t = setTimeout({
                    "Terminal.useEffect.t": ()=>{
                        if (loop) {
                            setLines([]);
                            setTyping("");
                            setLineIdx(0);
                            setCharIdx(0);
                            setSeqIdx({
                                "Terminal.useEffect.t": (i)=>(i + 1) % sequences.length
                            }["Terminal.useEffect.t"]);
                            setPhase("typing");
                        }
                    }
                }["Terminal.useEffect.t"], 3500);
                return ({
                    "Terminal.useEffect": ()=>clearTimeout(t)
                })["Terminal.useEffect"];
            }
        }
    }["Terminal.useEffect"], [
        phase,
        loop,
        sequences.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            if (phase !== "typing" || !currentLine) return;
            if (currentLine.type === "blank" || currentLine.type === "output") {
                const t = setTimeout({
                    "Terminal.useEffect.t": ()=>{
                        setLines({
                            "Terminal.useEffect.t": (l)=>[
                                    ...l,
                                    currentLine
                                ]
                        }["Terminal.useEffect.t"]);
                        advanceLine();
                    }
                }["Terminal.useEffect.t"], currentLine.delay || (currentLine.type === "output" ? 100 : 50));
                return ({
                    "Terminal.useEffect": ()=>clearTimeout(t)
                })["Terminal.useEffect"];
            }
            // typing animation for prompt/command
            if (charIdx < currentLine.text.length) {
                const speed = currentLine.type === "prompt" ? 40 : 55;
                const t = setTimeout({
                    "Terminal.useEffect.t": ()=>{
                        setTyping(currentLine.text.slice(0, charIdx + 1));
                        setCharIdx({
                            "Terminal.useEffect.t": (c)=>c + 1
                        }["Terminal.useEffect.t"]);
                    }
                }["Terminal.useEffect.t"], speed);
                return ({
                    "Terminal.useEffect": ()=>clearTimeout(t)
                })["Terminal.useEffect"];
            } else {
                // finished typing this line
                const t = setTimeout({
                    "Terminal.useEffect.t": ()=>{
                        setLines({
                            "Terminal.useEffect.t": (l)=>[
                                    ...l,
                                    {
                                        ...currentLine,
                                        text: typing || currentLine.text
                                    }
                                ]
                        }["Terminal.useEffect.t"]);
                        setTyping("");
                        setCharIdx(0);
                        advanceLine();
                    }
                }["Terminal.useEffect.t"], 300);
                return ({
                    "Terminal.useEffect": ()=>clearTimeout(t)
                })["Terminal.useEffect"];
            }
        }
    }["Terminal.useEffect"]);
    function advanceLine() {
        if (lineIdx + 1 < seq.length) {
            setLineIdx((i)=>i + 1);
        } else {
            setPhase("done");
        }
    }
    function renderLine(line, i) {
        if (line.type === "blank") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-3"
        }, i, false, {
            fileName: "[project]/components/Terminal.tsx",
            lineNumber: 84,
            columnNumber: 39
        }, this);
        if (line.type === "prompt") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "terminal-prompt select-none",
                        children: "❯"
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "terminal-command",
                        children: line.text
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this);
        }
        if (line.type === "command") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "terminal-prompt select-none",
                        children: "❯"
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "terminal-command",
                        children: line.text
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "terminal-output pl-4",
            children: line.text
        }, i, false, {
            fileName: "[project]/components/Terminal.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    const currentTypingLine = currentLine && phase === "typing" && charIdx > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "terminal-window w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "terminal-titlebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "terminal-dot terminal-dot-red"
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "terminal-dot terminal-dot-yellow"
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "terminal-dot terminal-dot-green"
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-3 text-xs",
                        style: {
                            color: "#586e75",
                            fontFamily: "monospace"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "terminal-body min-h-[180px]",
                children: [
                    lines.map(renderLine),
                    currentTypingLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            (currentLine.type === "prompt" || currentLine.type === "command") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "terminal-prompt select-none",
                                children: "❯"
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "terminal-command",
                                children: typing
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "terminal-cursor"
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    phase === "done" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "terminal-prompt select-none",
                                children: "❯"
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "terminal-cursor"
                            }, void 0, false, {
                                fileName: "[project]/components/Terminal.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Terminal.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Terminal.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Terminal.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(Terminal, "XIuJk+ngv6lQPKI/dnab8fIbaqc=");
_c = Terminal;
const HOME_SEQUENCES = [
    [
        {
            type: "command",
            text: "cd my-project && claude"
        },
        {
            type: "output",
            text: "✓ Claude Code ready. Type your request below.",
            delay: 500
        },
        {
            type: "blank",
            text: ""
        },
        {
            type: "prompt",
            text: "what does this project do?"
        },
        {
            type: "output",
            text: "Analyzing your codebase...",
            delay: 800
        },
        {
            type: "output",
            text: "This is a REST API built with Express + TypeScript.",
            delay: 400
        },
        {
            type: "output",
            text: "It handles user auth, product catalog, and order management.",
            delay: 300
        }
    ],
    [
        {
            type: "command",
            text: "claude"
        },
        {
            type: "blank",
            text: ""
        },
        {
            type: "prompt",
            text: "fix the login bug where users see a blank screen"
        },
        {
            type: "output",
            text: "Reading src/auth/login.ts...",
            delay: 600
        },
        {
            type: "output",
            text: "Found issue: missing null check on session.user",
            delay: 500
        },
        {
            type: "output",
            text: "✓ Fixed in src/auth/login.ts (line 47)",
            delay: 400
        },
        {
            type: "output",
            text: "✓ Tests passing",
            delay: 300
        }
    ],
    [
        {
            type: "command",
            text: "claude"
        },
        {
            type: "blank",
            text: ""
        },
        {
            type: "prompt",
            text: "write unit tests for the auth module and run them"
        },
        {
            type: "output",
            text: "Reading src/auth/...",
            delay: 500
        },
        {
            type: "output",
            text: "Writing tests/auth.test.ts...",
            delay: 600
        },
        {
            type: "output",
            text: "✓ 12 tests written",
            delay: 400
        },
        {
            type: "output",
            text: "Running npm test...",
            delay: 500
        },
        {
            type: "output",
            text: "✓ 12/12 passing (1.2s)",
            delay: 300
        }
    ],
    [
        {
            type: "command",
            text: "claude"
        },
        {
            type: "blank",
            text: ""
        },
        {
            type: "prompt",
            text: "commit my changes and create a PR"
        },
        {
            type: "output",
            text: "Reviewing changes: 3 files modified",
            delay: 600
        },
        {
            type: "output",
            text: "git commit -m 'fix: null check on session.user in login'",
            delay: 500
        },
        {
            type: "output",
            text: "gh pr create --title 'Fix blank screen on login'",
            delay: 400
        },
        {
            type: "output",
            text: "✓ PR #47 created: github.com/you/project/pull/47",
            delay: 300
        }
    ]
];
var _c;
__turbopack_context__.k.register(_c, "Terminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SpotlightCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpotlightCard",
    ()=>SpotlightCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SpotlightCard({ children, className = "", style }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMouseMove = (e)=>{
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        el.style.setProperty("--mouse-x", `${x}%`);
        el.style.setProperty("--mouse-y", `${y}%`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `spotlight-card ${className}`,
        style: style,
        onMouseMove: handleMouseMove,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/SpotlightCard.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(SpotlightCard, "QMBuJFIdzLIeqBcFwhMf246mjOM=");
_c = SpotlightCard;
var _c;
__turbopack_context__.k.register(_c, "SpotlightCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AnimatedSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedSection",
    ()=>AnimatedSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AnimatedSection({ children, className = "", delay = 0, animation = "up" }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedSection.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "AnimatedSection.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setTimeout({
                            "AnimatedSection.useEffect": ()=>{
                                el.classList.add("revealed");
                            }
                        }["AnimatedSection.useEffect"], delay);
                        observer.unobserve(el);
                    }
                }
            }["AnimatedSection.useEffect"], {
                threshold: 0.1
            });
            observer.observe(el);
            return ({
                "AnimatedSection.useEffect": ()=>observer.disconnect()
            })["AnimatedSection.useEffect"];
        }
    }["AnimatedSection.useEffect"], [
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `reveal-${animation} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/AnimatedSection.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(AnimatedSection, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = AnimatedSection;
var _c;
__turbopack_context__.k.register(_c, "AnimatedSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_de7905b3._.js.map