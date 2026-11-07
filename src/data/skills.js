import { Code2, Database, FolderGit, GitBranch, Globe, Layers3, Server, Workflow } from 'lucide-react';

export const skills = [
  { name: 'HTML5', icon: Globe },
  { name: 'CSS3', icon: Layers3 },
  { name: 'JavaScript', icon: Code2 },
  { name: 'React.js', icon: Workflow },
  { name: 'Tailwind CSS', icon: Layers3 },
  { name: 'Bootstrap', icon: Layers3 },
  { name: 'Node.js', icon: Server },
  { name: 'Express.js', icon: Server },
  { name: 'MongoDB', icon: Database },
  { name: 'Mongoose', icon: Database },
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: FolderGit },
  { name: 'REST APIs', icon: Code2 },
];

export const skillCategories = [
  { title: 'Frontend', subtitle: 'Modern interfaces and user experiences' },
  { title: 'Backend', subtitle: 'Scalable application logic and APIs' },
  { title: 'Tools', subtitle: 'Version control and deployment workflows' },
];

export const categoryMap = {
  HTML5: 'Frontend',
  CSS3: 'Frontend',
  JavaScript: 'Frontend',
  'React.js': 'Frontend',
  'Tailwind CSS': 'Frontend',
  Bootstrap: 'Frontend',
  'Node.js': 'Backend',
  'Express.js': 'Backend',
  MongoDB: 'Backend',
  Mongoose: 'Backend',
  Git: 'Tools',
  GitHub: 'Tools',
  'REST APIs': 'Backend',
};
