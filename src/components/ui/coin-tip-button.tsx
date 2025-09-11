"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';

// Register the Physics2DPlugin
gsap.registerPlugin(Physics2DPlugin);

interface CoinTipButtonProps {
  className?: string;
}

const CoinTipButton: React.FC<CoinTipButtonProps> = ({ className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const coin = coinRef.current;
    
    if (!button || !coin) return;

    // Configuration for physics-based animation with decreased velocity
    const config = {
      timeScale: 0.8, // Decreased velocity
      distance: {
        lower: 50,   // Decreased distance
        upper: 150,  // Decreased distance
      },
      bounce: {
        lower: 1,
        upper: 3,
      },
      velocity: {
        lower: 200,  // Decreased velocity
        upper: 400,  // Decreased velocity
      },
      rotation: {
        lower: 0,
        upper: 15,
      },
      flipSpeed: {
        lower: 0.3,
        upper: 0.8,
      },
      spins: {
        lower: 1,
        upper: 3,
      },
      rotate: {
        lower: 0,
        upper: 45,
      },
    };

    const handleClick = () => {
      console.log('Button clicked!'); // Debug log
      
      if (button.dataset.tipping === 'true') return;
      
      button.dataset.tipping = 'true';
      const currentRotation = Number(gsap.getProperty(button, 'rotate')) || 0;
      
      const duration = gsap.utils.mapRange(
        config.rotation.lower,
        config.rotation.upper,
        0,
        config.flipSpeed.upper
      )(Math.abs(currentRotation));
      
      const distance = gsap.utils.snap(
        1,
        gsap.utils.mapRange(
          config.rotation.lower,
          config.rotation.upper,
          config.distance.lower,
          config.distance.upper
        )(Math.abs(currentRotation))
      );

      const velocity = gsap.utils.mapRange(
        config.rotation.lower,
        config.rotation.upper,
        config.velocity.lower,
        config.velocity.upper
      )(Math.abs(currentRotation));
      
      const bounce = gsap.utils.mapRange(
        config.velocity.lower,
        config.velocity.upper,
        config.bounce.lower,
        config.bounce.upper
      )(Math.abs(velocity));

      const distanceDuration = gsap.utils.mapRange(
        config.distance.lower,
        config.distance.upper,
        config.flipSpeed.lower,
        config.flipSpeed.upper
      )(distance);

      const spin = gsap.utils.snap(
        1,
        gsap.utils.mapRange(
          config.distance.lower,
          config.distance.upper,
          config.spins.lower,
          config.spins.upper
        )(distance)
      );
      
      const offRotate = gsap.utils.random(config.rotate.lower, config.rotate.upper, 1) * -1;
      const hangtime = Math.max(1, duration * 3);

      const hole = button.querySelector('.hole') as HTMLElement;

      const tl = gsap
        .timeline({
          onComplete: () => {
            gsap.set(coin, {
              yPercent: 100,
            });
            gsap
              .timeline({
                onComplete: () => {
                  gsap.set(button, { clearProps: 'all' });
                  gsap.set(coin, { clearProps: 'all' });
                  gsap.set('.purse', { clearProps: 'all' });
                  button.dataset.tipping = 'false';
                  
                  // Open stripe payment
                  window.open('https://buy.stripe.com/5kQ4gz5sXfyB8Yx6vsbfO03', '_blank');
                },
              })
              .to(button, {
                yPercent: bounce,
                repeat: 1,
                duration: 0.15,
                yoyo: true,
              })
              .fromTo(
                hole,
                {
                  scale: 1,
                },
                {
                  scale: 0,
                  duration: 0.3,
                  delay: 0.3,
                }
              )
              .set(coin, {
                clearProps: 'all',
              })
              .set(coin, {
                yPercent: -50,
              })
              .timeScale(config.timeScale);
          },
        })
        .set(button, { transition: 'none' })
        .fromTo(
          button,
          {
            rotate: currentRotation,
          },
          {
            rotate: 0,
            duration,
            ease: 'elastic.out(1.5, 0.5)',
          }
        )
        .to(
          coin,
          {
            onUpdate: function () {
              const y = gsap.getProperty(coin, 'y');
              if (y >= coin.offsetHeight) {
                this.progress(1);
                tl.progress(1);
              }
            },
            duration: hangtime,
            physics2D: {
              velocity,
              angle: -90,
              gravity: 800, // Decreased gravity for slower fall
            },
          },
          `>-${duration * 0.7}`
        )
        .fromTo(
          coin,
          {
            rotateX: 0,
          },
          {
            duration: distanceDuration * 1.5,
            rotateX: spin * -360,
          },
          '<'
        )
        .to(
          coin,
          {
            rotateY: offRotate,
            duration: distanceDuration,
          },
          '<'
        )
        .to(
          coin,
          {
            '--rx': offRotate,
            duration: distanceDuration,
          },
          '<'
        )
        .fromTo(
          hole,
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.3,
          },
          hangtime * 0.4
        )
        .timeScale(config.timeScale);
    };

    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <span className="arrow arrow--instruction">
        <span>hold to flip coin</span>
        <svg viewBox="0 0 97 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74.568 0.553803C74.0753 0.881909 73.6295 1.4678 73.3713 2.12401C73.1367 2.70991 72.3858 4.67856 71.6584 6.50658C70.9544 8.35803 69.4526 11.8031 68.3498 14.1936C66.1441 19.0214 65.839 20.2167 66.543 21.576C67.4581 23.3337 69.4527 23.9196 71.3064 22.9821C72.4797 22.3728 74.8965 19.5839 76.9615 16.4435C78.8387 13.5843 78.8387 13.6077 78.1113 18.3418C77.3369 23.4275 76.4687 26.2866 74.5915 30.0364C73.254 32.7316 71.8461 34.6299 69.218 37.3485C65.9563 40.6999 62.2254 42.9732 57.4385 44.4965C53.8718 45.6449 52.3935 45.8324 47.2546 45.8324C43.3594 45.8324 42.1158 45.7386 39.9805 45.2933C32.2604 43.7466 25.3382 40.9577 19.4015 36.9735C15.0839 34.0909 12.5028 31.7004 9.80427 27.9975C6.80073 23.9196 4.36038 17.2403 3.72682 11.475C3.37485 8.1471 3.1402 7.32683 2.43624 7.13934C0.770217 6.71749 0.183578 7.77211 0.0193217 11.5219C-0.26226 18.5996 2.55356 27.1304 7.17619 33.1066C13.8403 41.7545 25.432 48.4103 38.901 51.2696C41.6465 51.8555 42.2566 51.9023 47.4893 51.9023C52.3935 51.9023 53.426 51.832 55.5144 51.3867C62.2723 49.9337 68.5375 46.6292 72.949 42.1998C76.0464 39.1296 78.1113 36.2939 79.8946 32.7081C82.1942 28.0912 83.5317 23.3103 84.2591 17.17C84.3999 15.8576 84.6111 14.7795 84.7284 14.7795C84.8223 14.7795 85.4559 15.1311 86.1364 15.5763C88.037 16.7716 90.3835 17.8965 93.5748 19.0918C96.813 20.3339 97.3996 20.287 96.4141 18.9512C94.9123 16.9122 90.055 11.5219 87.1219 8.63926C84.0949 5.66288 83.8368 5.33477 83.5552 4.1864C83.3909 3.48332 83.0155 2.68649 82.6401 2.31151C82.0065 1.6553 80.4109 1.04595 79.9885 1.30375C79.8712 1.37406 79.2845 1.11626 78.6744 0.717845C77.2431 -0.172727 75.7413 -0.243024 74.568 0.553803Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <main>
        <button ref={buttonRef} aria-label="Leave a tip" data-tipping="false">
          <span className="content">
            <span className="scene">
              <span className="hole"></span>
              <div className="purse">
                <div ref={coinRef} className="coin">
                  <div className="coin__face coin__face--front">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Webflow</title>
                      <path
                        d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="coin__core"></div>
                  <div className="coin__core coin__core--rotated"></div>
                  <div className="coin__face coin__face--rear">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Webflow</title>
                      <path
                        d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </span>
            <span>Leave tip</span>
          </span>
        </button>
      </main>
    </div>
  );
};

export default CoinTipButton;