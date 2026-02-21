"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { MatrixRain } from "@/components/matrix-rain";

const DEFAULT_BOOT_DURATION_MS = 3000;

type BootPhase = "boot" | "gate" | "ready";

const BIOS_LINES = [
  "UEFI Firmware Utility v2.31",
  "CPU: x86_64 Processor @ 3.20GHz",
  "Memory Test: 32768 MB OK",
  "PCIe Device Scan... OK",
  "NVMe Storage: 1 Device Detected",
  "USB Keyboard + Mouse Initialized",
  "ACPI Tables Loaded... OK",
  "Bootloader: /efi/boot/ashwattha.efi"
];

const GATE_STATUS_MESSAGES = [
  "Decrypting terminal glyph cache...",
  "Negotiating secure visitor handshake...",
  "Spinning up portfolio runtime..."
];

type BootSequenceContextValue = {
  reboot: () => void;
  isBooting: boolean;
};

const BootSequenceContext = createContext<BootSequenceContextValue | null>(null);

type BootSequenceProviderProps = {
  children: ReactNode;
  bootDurationMs?: number;
};

export function BootSequenceProvider({ children, bootDurationMs = DEFAULT_BOOT_DURATION_MS }: BootSequenceProviderProps) {
  const [bootCycle, setBootCycle] = useState(0);
  const [phase, setPhase] = useState<BootPhase>("boot");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setPhase("boot");

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setPhase("gate");
    }, bootDurationMs);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [bootCycle, bootDurationMs]);

  const reboot = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setBootCycle((current) => current + 1);
  };

  const enterPortfolio = () => {
    setPhase("ready");
  };

  const value = useMemo(
    () => ({
      reboot,
      isBooting: phase !== "ready"
    }),
    [phase]
  );

  return (
    <BootSequenceContext.Provider value={value}>
      <MatrixRain />
      <div className="relative z-10">{children}</div>
      <BiosOverlay visible={phase === "boot"} bootCycle={bootCycle} bootDurationMs={bootDurationMs} />
      <EnterOverlay visible={phase === "gate"} onEnter={enterPortfolio} />
    </BootSequenceContext.Provider>
  );
}

export function useBootSequence() {
  const context = useContext(BootSequenceContext);
  if (!context) {
    return {
      reboot: () => {},
      isBooting: false
    };
  }

  return context;
}

type BiosOverlayProps = {
  visible: boolean;
  bootCycle: number;
  bootDurationMs: number;
};

function BiosOverlay({ visible, bootCycle, bootDurationMs }: BiosOverlayProps) {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setElapsedMs(0);
    const interval = window.setInterval(() => {
      setElapsedMs((current) => Math.min(bootDurationMs, current + 90));
    }, 90);

    return () => {
      window.clearInterval(interval);
    };
  }, [bootCycle, bootDurationMs, visible]);

  const progressPercent = Math.min(100, Math.floor((elapsedMs / bootDurationMs) * 100));
  const visibleLineCount = Math.max(1, Math.ceil((elapsedMs / bootDurationMs) * BIOS_LINES.length));

  return (
    <div
      className={`fixed inset-0 z-[130] flex items-start justify-center bg-[#00408f] px-3 py-8 font-mono text-white transition-opacity duration-300 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="w-full max-w-5xl border border-white/55 bg-[#0051b5] p-4 shadow-2xl sm:p-6">
        <p className="text-xs uppercase tracking-[0.14em] text-white/90">Aptio Setup Utility - Boot Sequence</p>
        <p className="mt-1 text-xs text-white/80">Copyright (C) Firmware Technologies</p>

        <div className="mt-4 space-y-1 text-[13px] leading-6 sm:text-sm">
          {BIOS_LINES.slice(0, visibleLineCount).map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="text-white/80">
            System Boot Progress: {progressPercent}% <span className="bios-cursor">_</span>
          </p>
        </div>

        <div className="mt-6 h-2 w-full overflow-hidden border border-white/70 bg-[#003179]">
          <div
            className="h-full bg-white transition-[width] duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-white/80">Press F2 for Setup, ESC for Boot Menu</p>
      </div>
    </div>
  );
}

type EnterOverlayProps = {
  visible: boolean;
  onEnter: () => void;
};

function EnterOverlay({ visible, onEnter }: EnterOverlayProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onEnter();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onEnter, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setStatusIndex(0);
    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % GATE_STATUS_MESSAGES.length);
    }, 1200);

    return () => {
      window.clearInterval(interval);
    };
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 backdrop-blur-md transition-opacity duration-300 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.14em] text-white/80">Secure Terminal Access</p>
        <h2 className="mt-2 text-2xl font-semibold">View Portfolio</h2>
        <p className="mt-2 text-sm text-white/85">Press Enter or use the button below to continue.</p>

        <div className="mt-4 rounded-lg border border-white/35 bg-[#16090c]/74 p-3 font-mono text-xs text-[#ff97a4]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff3047]" />
            <span>{GATE_STATUS_MESSAGES[statusIndex]}</span>
          </div>
          <p className="mt-2 text-[#ffc0ca]">visitor@portfolio:~$ ./launch --mode=interactive</p>
        </div>

        <button
          type="button"
          onClick={onEnter}
          className="mt-5 inline-flex rounded-lg border border-white/70 bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
        >
          Enter Portfolio
        </button>
      </div>
    </div>
  );
}
