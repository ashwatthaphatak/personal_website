import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    id: "deltafs",
    title: "DeltaFS (Distributed Versioned Filesystem)",
    summary:
      "WAFL-inspired distributed filesystem with copy-on-write snapshots, journaling, and replicated metadata.",
    proof:
      "Correctness-critical filesystem behavior under concurrent writes, snapshotting, and crash recovery.",
    timeline: "Oct 2025 - Nov 2025",
    techStack: ["C++", "Linux", "Multithreading", "Sockets"],
    metrics: [
      "Benchmarked snapshot overhead under mixed read/write workloads.",
      "Validated recovery behavior through repeated crash and restart fault-injection tests."
    ],
    bullets: [
      "Designed block-level copy-on-write delta snapshots for efficient versioned storage semantics.",
      "Implemented crash-consistent journaling and recovery ordering for power-loss/process-kill scenarios.",
      "Built inter-node metadata sync to preserve namespace consistency across replicated nodes."
    ],
    tags: ["distributed", "filesystems", "infra", "concurrency"],
    links: [{ label: "GitHub", href: "https://github.com/ashwatthaphatak/DeltaFS" }]
  },
  {
    id: "vaxel",
    title: "Vaxel",
    summary:
      "Desktop app that sanitizes identity images with local ML defenses to reduce deepfake manipulation risk.",
    proof:
      "End-to-end integration across desktop runtime, frontend UX, and local ML inference in a privacy-first workflow.",
    timeline: "Feb 2026",
    techStack: ["Next.js", "Tauri", "Rust", "Python", "PyTorch", "OpenCV"],
    metrics: [
      "Implements 3 user-selectable protection levels (Low, Medium, High).",
      "Supports desktop packaging for macOS, Windows, and Linux."
    ],
    bullets: [
      "Built a Tauri desktop shell with a Next.js frontend and local Python ML engine.",
      "Implemented one-click image sanitization with side-by-side preview and export workflow.",
      "Added optional local deepfake-attack simulation to compare protected and unprotected outputs."
    ],
    tags: ["ml-ai", "vision", "systems"],
    links: [{ label: "GitHub", href: "https://github.com/ashwatthaphatak/Vaxel" }]
  },
  {
    id: "ros2-navigation",
    title: "Autonomous Navigation with TurtleBot3",
    summary:
      "ROS2 + Gazebo autonomy stack with multi-agent exploration and reinforcement-learning policy evaluation.",
    proof:
      "Autonomy pipeline integration across localization, planning, and control under noisy sensing and constrained compute.",
    timeline: "Aug 2025 - Dec 2025",
    techStack: ["Python", "ROS2", "Gazebo", "Nav2"],
    metrics: [
      "Compared exploration coverage behavior against baseline planners in simulation.",
      "Measured localization stability and drift patterns across filter configurations."
    ],
    bullets: [
      "Built distributed multi-agent exploration with Voronoi partitioning and cost-based task allocation.",
      "Implemented and compared Kalman vs Particle filtering for robust localization.",
      "Evaluated SARSA and Q-Learning policies for exploration efficiency under simulated uncertainty."
    ],
    tags: ["robotics", "autonomy", "navigation", "ml-ai"],
    links: [{ label: "GitHub", href: "https://github.com/ashwatthaphatak/Robotics-RL" }]
  },
  {
    id: "parallel-pointpillars",
    title: "Parallel PointPillars (TensorRT + OpenPCDet)",
    summary:
      "GPU-optimized PointPillars inference pipeline using TensorRT with parallelized preprocessing and postprocessing.",
    proof:
      "Real-time perception optimization with quantitative speed-versus-accuracy trade-off analysis.",
    timeline: "Apr 2025",
    techStack: ["Python", "C++", "CUDA", "TensorRT", "OpenPCDet", "KITTI"],
    metrics: [
      "Achieved ~31-34x end-to-end speedup over serial baselines across tested range-image settings.",
      "Maintained comparable detection quality with a small accuracy trade-off under aggressive optimization."
    ],
    bullets: [
      "Parallelized voxelization, TensorRT inference execution path, and decode/NMS stages for throughput.",
      "Benchmarked runtime and detection metrics across multiple range-image dimensions on KITTI.",
      "Documented FP16 timing and AP/recall trade-offs for deployment-oriented model tuning."
    ],
    tags: ["perception", "ml-ai", "autonomy"],
    links: [{ label: "GitHub", href: "https://github.com/ashwatthaphatak/Parallel-PointPillars" }]
  },
  {
    id: "xinu-kernel",
    title: "Xinu OS Kernel Work",
    summary:
      "Kernel-level scheduling and demand-paging work with starvation prevention and page-fault handling.",
    proof:
      "Low-level systems work in scheduler fairness, virtual memory management, and kernel-boundary debugging.",
    timeline: "Aug 2024 - Dec 2024",
    techStack: ["C", "Xinu", "QEMU", "GDB"],
    metrics: [
      "Validated scheduler fairness with stress tests across mixed CPU-bound and I/O-bound workloads.",
      "Verified page-fault handling behavior across demand-paging memory scenarios."
    ],
    bullets: [
      "Implemented priority-aware round-robin scheduling to prevent starvation under mixed workloads.",
      "Built demand paging with multi-level page tables and page-fault handling for large virtual address spaces.",
      "Validated behavior with QEMU/GDB instrumentation and workload-driven tests."
    ],
    tags: ["systems", "os", "kernel", "concurrency"],
    links: []
  },
  {
    id: "mem-access-profiler",
    title: "MemProf / Memory Access Profiler",
    summary:
      "Linux memory-access profiling pipeline that combines eBPF sampling with automated visualization for program behavior analysis.",
    proof:
      "Linux observability and low-level profiling, translating kernel-level signals into actionable diagnostics.",
    timeline: "Nov 2025",
    techStack: ["C++", "eBPF", "libbpf", "Python", "Linux"],
    metrics: [
      "Profiles page activity with a 25 ms sampling/export window for timeline analysis.",
      "Generates top-page visualizations (default top 512 pages) for workload comparison."
    ],
    bullets: [
      "Built an eBPF-based sampler (`memprofd`) to collect page-fault and page-activity traces.",
      "Implemented a Python pipeline to automate profiling runs and emit timeline heatmaps/scatter views.",
      "Packaged batch workflows for benchmarking multiple submissions and comparing memory-access patterns."
    ],
    tags: ["systems", "infra", "concurrency"],
    links: [{ label: "GitHub", href: "https://github.com/ashwatthaphatak/Mem_Access_Profiler" }]
  },
  {
    id: "semantic-concurrency-control",
    title: "Semantic Concurrency Control",
    summary:
      "Conflict-aware locking model for shared multi-agent memory using semantic similarity instead of key equality.",
    proof:
      "Distributed locking extensions beyond key-space conflicts through semantic similarity and commit-time validation.",
    timeline: "Feb 2026 - Apr 2026",
    techStack: ["Python", "FAISS", "Vector Search", "Distributed Coordination"],
    metrics: [
      "Benchmarked semantic conflict detection quality against key-level locking baselines.",
      "Measured throughput behavior under varying contention levels and lock scopes."
    ],
    bullets: [
      "Designed semantic lock predicates using vector similarity for conflict detection.",
      "Implemented optimistic commit-time validation for multi-writer updates.",
      "Benchmarked conflict detection quality and throughput against key-level lock baselines."
    ],
    tags: ["distributed", "concurrency", "ml-ai", "infra"],
    links: []
  },
  {
    id: "lidar-perception-benchmark",
    title: "LiDAR Perception Benchmarking (OpenPCDet)",
    summary:
      "Range-image compression/reconstruction experiments for 3D detection latency-accuracy tradeoff analysis.",
    proof:
      "Perception experiment design focused on turning model-level results into deployment-oriented guidance.",
    timeline: "Jan 2025 - May 2025",
    techStack: ["OpenPCDet", "PyTorch", "KITTI", "Python"],
    metrics: [
      "Characterized latency and AP/recall trade-offs across multiple input resolutions.",
      "Measured runtime variance and detector stability under compressed input conditions."
    ],
    bullets: [
      "Extended OpenPCDet for PBEA-based range image compression and reconstruction workflows.",
      "Benchmarked PointPillars and PV-RCNN across resolutions for latency, recall, and AP.",
      "Quantified where resolution loss begins to materially degrade detector performance."
    ],
    tags: ["perception", "ml-ai", "robotics", "autonomy"],
    links: []
  },
  {
    id: "carla-traffic-sign",
    title: "Real-Time Traffic Sign Perception in CARLA",
    summary:
      "Closed-loop perception + control integration in CARLA for sign-aware autonomous vehicle behavior.",
    proof:
      "Closed-loop linkage from vision outputs to control actions, with end-to-end simulation evaluation.",
    timeline: "Mar 2025",
    techStack: ["CARLA", "TensorFlow", "Computer Vision", "Python"],
    metrics: [
      "Measured end-to-end perception-to-control response timing in closed-loop simulation.",
      "Evaluated sign-detection quality across scenario-driven test runs."
    ],
    bullets: [
      "Integrated CNN-based sign classification into a live CARLA perception loop.",
      "Implemented proximity-aware triggers to convert detections into control actions.",
      "Measured response timing and failure cases for real-time feasibility."
    ],
    tags: ["vision", "robotics", "autonomy", "ml-ai"],
    links: []
  }
];
