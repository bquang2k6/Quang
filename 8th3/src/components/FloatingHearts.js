import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
`;

const Heart = styled.div`
  position: fixed;
  bottom: -100px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  animation: ${float} ${props => props.duration}s linear infinite;
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  z-index: 10;
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: 50%;
  }
  
  &:before {
    transform: translateX(-50%);
  }
  
  &:after {
    transform: translateY(-50%);
  }
`;

const FloatingHearts = ({ count = 15 }) => {
  const hearts = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 20 + 10;
    const colors = ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ff1493', '#db7093'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 10;
    
    return (
      <Heart 
        key={i}
        size={size}
        color={color}
        left={left}
        duration={duration}
        delay={delay}
      />
    );
  });
  
  return <>{hearts}</>;
};

export default FloatingHearts;