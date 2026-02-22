import type { SkillColumn } from "@/content/types";

export const skillColumns: SkillColumn[] = [
  {
    id: "systems-distributed",
    title: "Systems / Distributed",
    strongLabel: "Built with",
    strong: [
      "C/C++",
      "Linux",
      "Sockets",
      "Concurrency Control",
      "Filesystem/Journaling",
      "Kernel + Paging (Xinu)"
    ],
    familiarLabel: "Familiar",
    familiar: ["Consensus/Quorums", "Consistent Hashing", "Vector Clocks", "Failure Detectors"]
  },
  {
    id: "autonomy-perception-ml",
    title: "Autonomy / Perception / ML",
    strongLabel: "Built with",
    strong: ["ROS2", "Gazebo", "Nav2", "OpenPCDet", "PyTorch", "CARLA"],
    familiarLabel: "Familiar",
    familiar: ["Sensor Fusion", "SLAM", "Kalman/Particle Filters", "RL (SARSA, Q-Learning)"]
  },
  {
    id: "tools",
    title: "Tools",
    strongLabel: "Built with",
    strong: ["Git", "Docker", "GDB", "QEMU", "CMake/Make", "Flask"],
    familiarLabel: "Familiar",
    familiar: ["Kubernetes", "AWS/GCP", "TensorRT", "Tauri"]
  }
];
