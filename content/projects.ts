import type { Project } from "@/content/types";

export const projects: Project[] = [
  {
    id: "deltafs",
    title: "DeltaFS (Distributed Versioned Filesystem)",
    summary:
      "WAFL-inspired filesystem with copy-on-write snapshots and distributed metadata replication.",
    timeline: "Oct 2025 - Nov 2025",
    techStack: ["C++", "Linux", "Multithreading", "Sockets"],
    bullets: [
      "Designed copy-on-write snapshots with block-level delta encoding for efficient versioned storage.",
      "Implemented crash-consistent journaling for safer recovery under concurrent operations.",
      "Built socket-based inter-node metadata synchronization to preserve consistency across nodes."
    ],
    tags: ["distributed", "filesystems", "systems", "infra", "reliability"],
    links: [{ label: "Repo", href: "#" }]
  },
  {
    id: "xinu-kernel",
    title: "Xinu OS Kernel Work",
    summary:
      "Kernel-level scheduling and demand-paging improvements inspired by Linux behavior.",
    timeline: "Aug 2024 - Dec 2024",
    techStack: ["C", "Xinu", "QEMU", "GDB"],
    bullets: [
      "Implemented fair round-robin scheduling with priority-aware time slicing to eliminate starvation.",
      "Built demand paging with multi-level page tables and page-fault handling for 4GB virtual memory per process.",
      "Validated behavior using low-level debugging and workload-based scheduler tests."
    ],
    tags: ["systems", "os", "infra", "kernel", "reliability"],
    links: [{ label: "Repo", href: "#" }]
  },
  {
    id: "semantic-concurrency-control",
    title: "Semantic Concurrency Control",
    summary:
      "Semantic locking for shared multi-agent memory to prevent logically conflicting writes.",
    timeline: "Feb 2026 - Apr 2026",
    techStack: ["Python", "FAISS", "Vector Search", "Distributed Coordination"],
    bullets: [
      "Designed a semantic locking protocol using similarity-based conflict predicates beyond key-level locking.",
      "Implemented optimistic commit-time validation for multi-writer coordination.",
      "Reduced semantic race conditions in shared memory for LLM-style agent workflows."
    ],
    tags: ["distributed", "consistency", "concurrency", "ml-ai", "agents"],
    links: [{ label: "Paper", href: "#" }]
  },
  {
    id: "ros2-navigation",
    title: "Autonomous Navigation with TurtleBot3",
    summary:
      "ROS2 + Gazebo navigation stack with multi-agent exploration and RL-based control experiments.",
    timeline: "Aug 2025 - Dec 2025",
    techStack: ["Python", "ROS2", "Gazebo", "Nav2"],
    bullets: [
      "Built a distributed exploration framework with Voronoi partitioning and cost-based task allocation.",
      "Implemented and compared Kalman and Particle Filters for robust localization under sensor uncertainty.",
      "Evaluated SARSA and Q-Learning policies for autonomous exploration efficiency."
    ],
    tags: ["robotics", "autonomy", "navigation", "ml-ai", "perception"],
    links: [{ label: "Demo", href: "#" }]
  },
  {
    id: "lidar-perception-benchmark",
    title: "LiDAR Perception Benchmarking (OpenPCDet)",
    summary:
      "Range-image compression and reconstruction study for 3D object detection trade-off analysis.",
    timeline: "Jan 2025 - May 2025",
    techStack: ["OpenPCDet", "PyTorch", "KITTI", "Python"],
    bullets: [
      "Extended OpenPCDet to support PBEA-based range image compression and reconstruction.",
      "Benchmarked PointPillars and PV-RCNN across input resolutions for latency and accuracy.",
      "Quantified recall/AP sensitivity to spatial resolution and metadata fidelity."
    ],
    tags: ["perception", "ml-ai", "robotics", "benchmarking", "reliability"],
    links: [{ label: "Write-up", href: "#" }]
  },
  {
    id: "carla-traffic-sign",
    title: "Real-Time Traffic Sign Perception in CARLA",
    summary:
      "Integrated CNN-based sign perception with closed-loop control responses in simulation.",
    timeline: "Mar 2025",
    techStack: ["CARLA", "TensorFlow", "Computer Vision"],
    bullets: [
      "Integrated a CNN traffic-sign classifier into a live CARLA perception pipeline.",
      "Built a proximity-based control trigger to convert detections into vehicle actions.",
      "Measured end-to-end response timing for real-time control feasibility."
    ],
    tags: ["robotics", "perception", "ml-ai", "vision", "autonomy"],
    links: [{ label: "Demo", href: "#" }]
  },
  {
    id: "vaxel",
    title: "Vaxel (Deepfake-Resistant Image Sanitization)",
    summary:
      "Local-first ML pipeline that perturbs identity cues to reduce deepfake vulnerability.",
    timeline: "Feb 2026",
    techStack: ["PyTorch", "OpenCV", "Tauri", "Next.js"],
    bullets: [
      "Designed a texture-focused perturbation pipeline to harden portraits against attribute manipulation attacks.",
      "Implemented attack simulation modules for robustness testing under deepfake-style transforms.",
      "Built an on-device desktop UX with Tauri + Python sidecar for private inference."
    ],
    tags: ["ml-ai", "vision", "security", "infra", "perception"],
    links: [{ label: "Repo", href: "#" }]
  }
];
