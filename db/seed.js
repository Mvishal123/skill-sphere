import { db } from ".";

const techTopicsData = [
  { category: "Computer Science" },
  { category: "Artificial Intelligence" },
  { category: "Data Science" },
  { category: "Blockchain" },
  { category: "Cybersecurity" },
  { category: "Information Technology" },
  { category: "Software Engineering" },
  { category: "Networking" },
  { category: "Database Management" },
  { category: "Machine Learning" },
  { category: "Web Development" },
  { category: "Mobile App Development" },
  { category: "Computer Graphics" },
  { category: "Human-Computer Interaction" },
  { category: "Cloud Computing" },
  { category: "Internet of Things (IoT)" },
  { category: "Robotics" },
  { category: "Computer Vision" },
  { category: "Natural Language Processing" },
  { category: "Embedded Systems" },
  { category: "Bioinformatics" },
  { category: "Augmented Reality" },
  { category: "Virtual Reality" },
  { category: "Quantum Computing" },
  { category: "Ethical Hacking" },
  { category: "Game Development" },
  { category: "Big Data Analytics" },
  { category: "Information Systems" },
  { category: "IT Project Management" },
  { category: "Geographic Information Systems (GIS)" },
  { category: "Digital Marketing Technology" },
];

try {
  await db.coursecategory.createMany({
    data: techTopicsData,
  });
} catch (error) {
  console.log("[SEED ERROR]");
}
