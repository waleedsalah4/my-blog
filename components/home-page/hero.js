import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      `<div className={classes.image}>
            <Image
                src='/images/site/waleed.jpg'
                alt='An image showing Max'
                width={400}
                height={400}
                priority
            />
        </div>
        <h1>Hi, I am Waleed</h1>
        <p>
            I blog about web development - especially frontend frameworks like
            React or Angular.
        </p>
    </section>
  );
}

export default Hero;