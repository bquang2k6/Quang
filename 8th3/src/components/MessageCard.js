import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// In the MessageCard.js file, update the CardContainer styled component:

const CardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 35px;
  max-width: 550px;
  width: 90%;
  box-shadow: 
    0 10px 30px rgba(255, 105, 180, 0.3),
    0 0 20px rgba(255, 182, 193, 0.2),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  margin-bottom: ${props => props.marginBottom ? '30px' : '0'};
  z-index: 10;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #ff69b4, #ffb6c1, #ff69b4);
    animation: shimmer 3s infinite linear;
    background-size: 200% 100%;
  }
  
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,182,193,0.8) 0%, rgba(255,182,193,0) 70%);
    border-radius: 50%;
    opacity: 0.6;
    filter: blur(10px);
  }
`;

const MessageWrapper = styled(motion.div)`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 25px;
  font-family: 'Comic Sans MS', 'Bubblegum Sans', 'Indie Flower', cursive;
  text-align: center;
  position: relative;
  
  &:first-letter {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ff69b4;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,105,180,0.5), transparent);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ffb6c1);
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 
    0 4px 15px rgba(255, 105, 180, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const HeartIcon = styled(motion.span)`
  display: inline-block;
  margin-left: 10px;
  font-size: 1.2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 105, 180, 0.2);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(to right, #ff69b4, #ffb6c1);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const FloatingHeart = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CustomHeart = ({ color }) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 28C16 28 3 20.5 3 11.5C3 7.5 6 4.5 10 4.5C12.5 4.5 14.5 5.5 16 7.5C17.5 5.5 19.5 4.5 22 4.5C26 4.5 29 7.5 29 11.5C29 20.5 16 28 16 28Z"
            fill={color}
            stroke="white"
            strokeWidth="1"
        />
    </svg>
);

const messages = [
    "Gửi đến người phụ nữ tuyệt vời nhất trong cuộc đời anh, em mang đến niềm vui và hạnh phúc cho mỗi ngày.",
    "Nụ cười của em thắp sáng thế giới của anh, và tình yêu của em lấp đầy trái tim anh bằng sự ấm áp.",
    "Vào ngày đặc biệt này, anh muốn em biết em có ý nghĩa như thế nào đối với anh.",
    "Em không chỉ là bạn gái của anh, em là bạn thân nhất của anh, là người bạn tâm giao và là tất cả của anh.",
    "Anh trân trọng từng khoảnh khắc chúng ta bên nhau, và anh mong muốn tạo ra nhiều kỷ niệm đẹp hơn nữa.",
    "Chúc mừng Ngày Phụ nữ, tình yêu của anh! Em xứng đáng có được tất cả hạnh phúc trên thế giới này."
];

// Then update the MessageCard component to accept and pass the prop:

const FullscreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeartRow = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

const FinalMessage = styled(motion.div)`
  font-size: 4rem;
  color: white;
  font-family: 'Pacifico', cursive;
  text-shadow: 0 0 20px #ff69b4, 0 0 30px #ff69b4;
  z-index: 1001;
  position: absolute;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 30px 50px;
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(255, 105, 180, 0.8);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    font-size: 3rem;
    padding: 20px 30px;
  }
`;

const MessageDecoration = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`;



const MessageCard = ({ marginBottom }) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const [showFinalEffect, setShowFinalEffect] = useState(false);

    const nextMessage = () => {
        // If we're on the last message and click "Finish"
        if (currentMessage === messages.length - 1) {
            setShowFinalEffect(true);
            return;
        }

        // Create floating hearts effect when button is clicked
        const heartColors = ['#ff69b4', '#ffb6c1', '#ff1493', '#db7093', '#ffc0cb'];
        const newHearts = Array.from({ length: 5 }).map((_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 80 + 10, // Random position
            y: Math.random() * 30 + 60,
            size: Math.random() * 20 + 15,
            rotation: Math.random() * 30 - 15,
            color: heartColors[Math.floor(Math.random() * heartColors.length)]
        }));

        setFloatingHearts(prev => [...prev, ...newHearts]);

        // Remove hearts after animation
        setTimeout(() => {
            setFloatingHearts(prev => prev.filter(heart => !newHearts.includes(heart)));
        }, 2000);

        setCurrentMessage((prev) => (prev + 1) % messages.length);
    };

    // Calculate progress percentage
    const progress = ((currentMessage + 1) / messages.length) * 100;

    // Generate heart rows for the final effect
    const heartRows = Array.from({ length: 15 }).map((_, rowIndex) => {
        return (
            <HeartRow
                key={rowIndex}
                initial={{ x: rowIndex % 2 === 0 ? -1000 : 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: rowIndex * 0.1,
                    ease: "easeOut"
                }}
            >
                {Array.from({ length: 10 }).map((_, colIndex) => {
                    const heartColors = ['#ff69b4', '#ffb6c1', '#ff1493', '#db7093', '#ffc0cb'];
                    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
                    const size = Math.random() * 15 + 25;

                    return (
                        <div key={colIndex} style={{ width: size, height: size }}>
                            <CustomHeart color={color} />
                        </div>
                    );
                })}
            </HeartRow>
        );
    });

    return (
        <>
            <CardContainer
                marginBottom={marginBottom}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    <MessageWrapper
                        key={currentMessage}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Message
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    staggerChildren: 0.1
                                }
                            }}
                        >
                            {messages[currentMessage]}
                        </Message>
                    </MessageWrapper>
                </AnimatePresence>

                <ButtonContainer>
                    <Button
                        onClick={nextMessage}
                        whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(255, 105, 180, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {currentMessage === messages.length - 1 ? 'Finish' : 'Next Message'}
                        <HeartIcon
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        >
                            <CustomHeart color="#fff" />
                        </HeartIcon>
                    </Button>
                </ButtonContainer>

                <ProgressBar>
                    <Progress progress={progress} />
                </ProgressBar>

                {floatingHearts.map(heart => (
                    <FloatingHeart
                        key={heart.id}
                        size={heart.size}
                        style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                        initial={{ opacity: 0, y: 0, rotate: heart.rotation }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            rotate: heart.rotation
                        }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <CustomHeart color={heart.color || '#ff69b4'} />
                    </FloatingHeart>
                ))}
            </CardContainer>

            {showFinalEffect && (
                <FullscreenOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {heartRows}

                    <MessageDecoration>
                       
                    </MessageDecoration>

                    <FinalMessage
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                    >
                        <motion.div
                            animate={{
                                textShadow: [
                                    "0 0 20px #ff69b4, 0 0 30px #ff69b4",
                                    "0 0 40px #ff69b4, 0 0 60px #ff69b4",
                                    "0 0 20px #ff69b4, 0 0 30px #ff69b4"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            I Love You
                        </motion.div>
                    </FinalMessage>
                </FullscreenOverlay>
            )}
        </>
    );
};

export default MessageCard;