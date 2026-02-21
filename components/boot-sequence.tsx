"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { MatrixRain } from "@/components/matrix-rain";

const DEFAULT_BOOT_DURATION_MS = 2000;

type BootPhase = "boot" | "ready";

const BIOS_LINES = [
  "UEFI Firmware Utility v2.31",
  "CPU: x86_64 Processor @ 3.20GHz",
  "Memory Test: 32768 MB OK",
  "PCIe Device Scan... OK",
  "NVMe Storage: 1 Device Detected",
  "USB Keyboard + Mouse Initialized",
  "ACPI Tables Loaded... OK",
  "Bootloader: /efi/boot/ashwattha.efi",
  "Kernel Image Verified (sha256)... OK",
  "Initramfs Unpacked... OK",
  "Systemd Units: 143 Loaded",
  "Network Stack: eth0 up, wlan0 up",
  "Container Runtime Socket Active",
  "Edge Diagnostics Service Active",
  "Telemetry Buffer Initialization... OK",
  "Portfolio Runtime Entering Interactive Mode"
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
      setPhase("ready");
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

  const value = useMemo(
    () => ({
      reboot,
      isBooting: phase === "boot"
    }),
    [phase]
  );

  return (
    <BootSequenceContext.Provider value={value}>
      <MatrixRain />
      <div className="relative z-10">{children}</div>
      <BiosOverlay visible={phase === "boot"} bootCycle={bootCycle} bootDurationMs={bootDurationMs} />
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
