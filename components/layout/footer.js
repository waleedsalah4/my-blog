import React from 'react';
import classes from './footer.module.css';
import Link from 'next/link';
import linkedInIcon from '../../public/images/site/icons/linkedin.svg';
import githubIcon from '../../public/images/site/icons/github.svg';

function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.links}>
                <Link href='https://github.com/waleedsalah4' target='_blank' aria-label='Github Account'>
                <img src='/images/site/icons/github.svg' alt="linked in icon" />
                </Link>
                <Link href='https://www.linkedin.com/in/waleed-salah-9b4a541b4/' target='_blank' aria-label='LinledIn Account'>
                    <img src='/images/site/icons/linkedin.svg' alt="linked in icon" />
                </Link>
            </div>
            <p className={classes.text}>
                &copy;	{new Date().getFullYear()} Created by Waleed Salah
            </p>
        </footer>
    )
}

export default Footer