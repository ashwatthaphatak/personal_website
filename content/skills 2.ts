import type { SkillGroup } from "@/content/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["C", "C++", "Python", "Go", "Bash", "TypeScript"]
  },
  {
    id: "systems-os",
    title: "Systems/OS",
    items: [
      "Linux",
      "Embedded Linux",
      "RTOS",
      "Kernel Internals",
      "Device Drivers",
      "Filesystems",
      "Real-Time Scheduling",
      "QEMU",
      "GDB"
    ]
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    items: [
      "Consistency Models",
      "Leader Election",
      "Consistent Hashing",
      "Quorum Protocols",
      "Vector Clocks",
      "Socket Programming",
      "Distributed Metadata Replication",
      "Crash-Consistent Journaling",
      "Concurrency Control"
    ]
  },
  {
    id: "robotics",
    title: "Robotics",
    items: [
      "ROS",
      "ROS2",
      "Gazebo",
      "RViz",
      "Nav2",
      "CARLA Simulator",
      "SLAM",
      "Localization",
      "Path Planning",
      "Sensor Fusion"
    ]
  },
  {
    id: "ml-perception",
    title: "ML/Perception",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Open3D",
      "PCL",
      "OpenPCDet",
      "LiDAR 3D Vision",
      "Reinforcement Learning",
      "Kalman/Particle Filters",
      "CUDA",
      "TensorRT"
    ]
  },
  {
    id: "tools-cloud-devops",
    title: "Tools/Cloud/DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Git",
      "CMake",
      "Make",
      "Flask",
      "MongoDB",
      "FAISS"
    ]
  }
];
