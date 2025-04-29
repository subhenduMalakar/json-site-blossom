
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    // Apply theme class
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <Button 
      variant="outline"
      size="icon"
      className="rounded-full bg-white/10 backdrop-blur-sm border-white/20"
      onClick={toggleTheme}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <Moon className="h-[1.2rem] w-[1.2rem] text-yellow-300" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
        )}
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;
