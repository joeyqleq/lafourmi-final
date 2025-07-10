import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HyperText } from '@/components/ui/hyper-text';

const ScrollingProductCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: 1,
      title: "Boutique Experience",
      text: "La Fourmi is a boutique experience, curating the finest premium and affordable goods—both local treasures and international staples—delivered right to your doorstep with care and consistency.",
    },
    {
      id: 2,
      title: "Lebanese Hospitality",
      text: "La Fourmi isn't just a minimarket—it's a celebration of homegrown Lebanese hospitality. Every shelf reflects thousands of handpicked products chosen to bring warmth, flavor, and familiarity to your daily life.",
    },
    {
      id: 3,
      title: "Neighborhood Lifeline",
      text: "La Fourmi is your ultimate neighborhood lifeline. From pantry to cleaning cabinet, it's stocked with everything your home could ever need—expertly managed by Elie the wizard, your local retail sorcerer.",
    },
    {
      id: 4,
      title: "Lifestyle Choice",
      text: "La Fourmi isn't just a store—it's a lifestyle. Rooted in trust, fueled by service, and built to keep your household running smooth, stocked, and smiling—day in, day out.",
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if section is in view and should be sticky
      if (rect.top <= 0 && rect.bottom > viewportHeight) {
        setIsSticky(true);
        
        // Calculate which card should be active based on scroll position within the section
        const scrolledAmount = Math.abs(rect.top);
        const sectionHeight = rect.height - viewportHeight;
        const scrollProgress = scrolledAmount / sectionHeight;
        const newActiveCard = Math.min(
          Math.floor(scrollProgress * cards.length),
          cards.length - 1
        );
        setActiveCard(newActiveCard);
      } else if (rect.top > 0) {
        setIsSticky(false);
        setActiveCard(0);
      } else if (rect.bottom <= viewportHeight) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${100 + cards.length * 40}vh` }}
    >
      {/* Sticky container - only shows when section is in view */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 h-screen flex items-center justify-center z-50 bg-background">
          <div className="container mx-auto max-w-6xl px-8">
            {/* Header Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-mono text-foreground">
                <HyperText 
                  text="Why Choose" 
                  className="text-4xl md:text-5xl font-bold font-mono mr-4 text-foreground"
                  animateOnLoad={false}
                />
                <span className="text-gradient animate-glow">
                  <HyperText 
                    text="La Fourmi" 
                    className="text-4xl md:text-5xl font-bold font-mono text-gradient animate-glow"
                    animateOnLoad={false}
                  />
                </span>
              </h2>
            </motion.div>

            {/* File Stack Container */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative h-[500px] flex items-center justify-center">
                {/* File Stack Base - Showing multiple papers underneath */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Background file shadows to create stack effect */}
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={`shadow-${i}`}
                      className="absolute w-full h-96 bg-muted/20 rounded-lg border border-muted"
                      style={{
                        transform: `translate(${i * 3}px, ${i * 3}px) rotate(${i * 0.5}deg)`,
                        zIndex: -i,
                        opacity: 0.3 - i * 0.05
                      }}
                    />
                  ))}
                  
                  {/* Active Files */}
                  {cards.map((card, index) => {
                    const isActive = index === activeCard;
                    const offset = index - activeCard;
                    const isCardVisible = Math.abs(offset) <= 2;
                    
                    return (
                      <AnimatePresence key={card.id}>
                        {isCardVisible && (
                          <motion.div
                            className="absolute w-full h-96"
                            initial={{ 
                              opacity: 0,
                              scale: 0.9,
                              rotateX: offset * 8,
                              rotateY: offset * 5,
                              z: -Math.abs(offset) * 50
                            }}
                            animate={{ 
                              opacity: isActive ? 1 : 0.7,
                              scale: isActive ? 1 : 0.95 - Math.abs(offset) * 0.02,
                              rotateX: offset * 3,
                              rotateY: offset * 2,
                              z: -Math.abs(offset) * 30,
                              x: offset * 8,
                              y: offset * 6
                            }}
                            exit={{ 
                              opacity: 0,
                              scale: 0.9,
                              rotateX: offset * 15,
                              transition: { duration: 0.4 }
                            }}
                            transition={{ 
                              duration: 0.5,
                              ease: "easeInOut"
                            }}
                            style={{ 
                              zIndex: cards.length - Math.abs(offset),
                              transformStyle: "preserve-3d"
                            }}
                          >
                            {/* File Paper with hole punches and realistic paper look - Now using dark theme */}
                            <div 
                              className="relative h-full w-full bg-card rounded-lg shadow-2xl border border-grocery-yellow/20"
                              style={{
                                boxShadow: isActive 
                                  ? '0 25px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,193,7,0.3), 0 0 30px rgba(255,193,7,0.2)'
                                  : '0 15px 30px rgba(0,0,0,0.4)'
                              }}
                            >
                              {/* File holes on the left side */}
                              <div className="absolute left-8 top-1/2 transform -translate-y-1/2 space-y-8">
                                {[...Array(3)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="w-6 h-6 bg-background rounded-full shadow-inner border border-grocery-yellow/30"
                                    style={{
                                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* File Tab/Header */}
                              <div className="absolute top-0 left-20 right-4 h-16 bg-gradient-to-r from-grocery-yellow to-grocery-yellow rounded-t-lg flex items-center justify-center">
                                <span className="font-bold text-black text-lg font-mono tracking-wider">
                                  FILE #{String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                              
                              {/* File Content Area */}
                              <div className="pt-20 pb-8 px-16 h-full flex flex-col justify-center">
                                {/* Title */}
                                <motion.h3 
                                  className="text-2xl font-bold mb-6 text-foreground font-mono border-b-2 border-grocery-yellow pb-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: isActive ? 1 : 0.7 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {card.title}
                                </motion.h3>
                                
                                {/* Content with typewriter lines */}
                                <motion.div
                                  className="space-y-3 text-foreground/90"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: isActive ? 1 : 0.7 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  {card.text.split('. ').map((sentence, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                      <div className="w-2 h-2 bg-grocery-yellow rounded-full flex-shrink-0" />
                                      <p className="text-sm leading-relaxed font-mono">
                                        {sentence}{sentence.endsWith('.') ? '' : '.'}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>

                                {/* File footer with document stats */}
                                <motion.div 
                                  className="mt-auto pt-6 border-t border-grocery-yellow/20 flex justify-between text-xs text-muted-foreground font-mono"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: isActive ? 1 : 0.5 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  <span>DOC#{index + 1}_LAFOURMI.txt</span>
                                  <span>Size: {Math.floor(card.text.length / 10)}KB</span>
                                  <span>Lines: {card.text.split('. ').length}</span>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScrollingProductCards;
