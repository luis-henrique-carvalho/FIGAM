import { PrismicNextLink } from '@prismicio/next';
import React, { JSX, ReactComponentElement } from 'react';
import { IconType } from 'react-icons';
import { ContactCardSlice } from '../../prismicio-types';

interface Props {
    icon: JSX.Element | ReactComponentElement<IconType>;
    title: string;
    subTitle: string;
    link: string;
    buttonText: string;
}

const ContactCard = ({ icon, title, subTitle, link, buttonText }: Props) => {
    return (
        <article className="contact__option">
            {icon}
            <h4>{title}</h4>
            <h5>{subTitle}</h5>
            <PrismicNextLink href={link}>
                {buttonText}
            </PrismicNextLink>
        </article>
    );
};

export default ContactCard;
