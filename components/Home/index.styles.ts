import styled from 'styled-components'
import { Defaults, Color, Font, Media } from 'styles/variables'

export const SectionH1 = styled.h1<{ fontSize?: number }>`
  && {
    ${({ fontSize }) => fontSize && `font-size: ${fontSize}rem;`}

    ${Media.mobile} {
      // get the font size from the parent and divide by 1.5 to get the mobile size
      font-size: calc(${({ fontSize }) => fontSize}rem / 1.5);
    }
  }
`

export const Section = styled.section<{
  hero?: boolean
  breakMedium?: boolean
  colorVariant?: string
  flow?: string
  fullWidth?: boolean
  mediumSwitchOrder?: boolean
  mobileSwitchOrder?: boolean
}>`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-flow: ${({ flow }) => (flow === 'column' ? 'column wrap' : 'row')};
  gap: 8rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  align-items: ${({ hero }) => (hero ? 'center' : 'normal')};
  padding: 0;
  background: ${({ colorVariant }) => (colorVariant === 'dark' ? Color.darkBlue : 'transparent')};
  color: ${({ colorVariant }) => (colorVariant === 'dark' ? Color.lightBlue : 'inherit')};

  ${Media.desktopDown} {
    padding: 0 3.2rem;
  }

  ${Media.mobile} {
    height: auto;
    max-width: 100%;
    min-height: initial;
    flex-flow: column wrap;
  }

  .text-weight-light {
    font-weight: ${Font.weightLight};
  }

  // Hero specific styling
  ${({ hero, breakMedium }) =>
    (hero || breakMedium) &&
    `
    margin: 0 auto;
    min-height: 90rem;
    // padding-top: 10rem;
    ${Color.gradientMesh};

    > 

    ${Media.mediumDown} {
      padding: 3.2rem 0;
      min-height: initial;
      flex-flow: column wrap;
    }

    ${Media.mobile} {
      padding: 5.6rem 3.2rem 0;
    }
    
  `}
  }

  ${({ mobileSwitchOrder }) =>
    mobileSwitchOrder &&
    `
    > div:first-child {
      ${Media.mobile} {
        order: 2;
      }
    }
  `}

  ${({ mobileSwitchOrder }) =>
    mobileSwitchOrder &&
    `
    > div:last-child {
      ${Media.mobile} {
        order: 1;
      }
    }
  `}

  ${({ mediumSwitchOrder }) =>
    mediumSwitchOrder &&
    `
    > div:first-child {
      ${Media.mediumDown} {
        order: 2;
      }
    }
  `}

  ${({ mediumSwitchOrder }) =>
    mediumSwitchOrder &&
    `
    > div:last-child {
      ${Media.mediumDown} {
        order: 1;
      }
    }
  `}

  h1, h2, h3 {
    color: ${({ colorVariant }) => (colorVariant === 'dark' ? Color.lightBlue : Color.darkBlue)};
    font-size: 5rem;
    line-height: 1.2;
    font-weight: ${Font.weightNormal};
    margin: 0;
    text-align: center;
    width: 100%;
    z-index: 1;

    ${Media.mediumDown} {
      font-size: 4rem;
      text-align: center;
    }
  }

  h1 {
    // Hero specific styling
    ${({ hero, breakMedium }) =>
      (hero || breakMedium) &&
      `
      font-size: 7rem;
      font-weight: 600;
      text-align: left;

      ${Media.mediumDown} {
        font-size: 4rem;
        text-align: center;
      }
    `}
  }

  h3 {
    font-size: 6rem;
    font-weight: ${Font.weightMedium};
    color: ${({ colorVariant }) => (colorVariant === 'dark' ? `
        font-weight: ${Font.weightMedium};
        background: ${Color.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `: Color.darkBlue)};



    &::selection {
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
    }

    ${Media.desktopDown} {
      font-size: 3.8rem;
    }
  }
`

export const SectionContent = styled.div<{
  flow?: string
  hero?: boolean
  breakMedium?: boolean
  variant?: string
  reverseOrderMobile?: string
  margin?: string
}>`
  display: flex;
  width: 100%;
  max-width: ${Defaults.pageMaxWidth};
  margin: ${({ margin }) => margin ? `${margin}` : '16rem auto'};

  ${Media.mobile} {
    flex-flow: row wrap;
  }

  ${({ hero }) =>
    hero &&
    `
    ${Media.mediumDown} {
      margin: 16rem 2.4rem 0;
    }
  `}

  ${({ reverseOrderMobile }) =>
    reverseOrderMobile &&
    `
      ${Media.mobile} {
        flex-flow: ${reverseOrderMobile};
      }
  `};

  > div {
    display: flex;
    flex-flow: ${({ flow }) => (flow === 'column' ? 'column wrap' : 'row wrap')};
    flex: ${({ flow }) => (flow === 'column' ? '1 1 auto' : '1 1 50%')};
    justify-content: ${({ flow }) => (flow === 'column' ? 'center' : 'flex-start')};
    align-items: center;
    align-content: center;
    gap: 5rem;
    z-index: 1;
    max-width: 100%;

    ${Media.mobile} {
      flex: 1 1 auto;
      gap: 3.2rem;
    }

    p > a {
      color: ${Color.lightBlue};
    }
  }

  ${({ variant }) =>
    variant === 'banner' &&
    `
    border-radius: 1.6rem;
    background: ${Color.darkBlue4};
    padding: 0;

      > div {
        padding: 6rem;
      }
  `}
`

export const Separator = styled.div`
  width: 100%;
  height: 0.1rem;
  background: ${Color.gradient};
`

export const StepWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem;
  margin: 2.6rem auto 0;

  ${Media.mediumDown} {
    display: flex;
    flex-flow: column wrap;
  }
`

export const StepContainer = styled.div<{ imageWidth?: number }>`
  display: flex;
  flex-flow: column wrap;
  background: ${Color.darkBlue2};
  box-shadow: ${Defaults.boxShadow};
  border-radius: 1.2rem;
  padding: 3.4rem;

  ${Media.mediumDown} {
    padding: 2.4rem;
  }

  > span {
    height: 3.6rem;
    width: 3.6rem;
    border-radius: 3.6rem;
    margin: 0 0 1.6rem;
    padding: 0;
    background: ${Color.darkBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${Color.lightBlue};
    font-size: 1.8rem;
    font-weight: ${Font.weightBold};
  }

  > img {
    width: 100%;
    height: 100%;
    max-width: ${({ imageWidth }) => (imageWidth ? `${imageWidth}rem` : '10rem')};
    max-height: 10rem;
    object-fit: contain;
    margin: 0 auto 1.6rem;
    flex: 0 1 auto;

    ${Media.mediumDown} {
      height: 8rem;
    }
  }

  > p {
    font-size: 1.6rem;
    color: ${Color.text2};
    font-weight: ${Font.weightNormal};
    line-height: 1.6;
    margin: 1.6rem auto;
    text-align: center;
    flex: 0 1 auto;
  }

  > p > b {
    font-size: 3.4rem;
    display: block;
    color: ${Color.lightBlue};
    background: ${Color.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 2.4rem;
    width: 100%;
    text-align: center;
    line-height: 1;

    &::selection {
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
    }
  }
`

export const CardWrapper = styled.div<{ maxWidth?: number}>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth ? `${maxWidth}rem` : '100%'};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin: 2.6rem auto 0;

  ${Media.mediumDown} {
    display: flex;
    flex-flow: column wrap;
    max-width: 100%;
  }
`

export const CardItem = styled.div<{ variant?: string; imageHeight?: number; textCentered?: boolean; gap?: number }>`
  display: flex;
  flex-flow: column wrap;
  background: ${({ variant }) => (variant === 'outlined-dark' ? 'transparent' : Color.white)};
  box-shadow: ${({ variant }) => (variant === 'outlined-dark' ? 'none' : '0px 1px 50px rgba(5, 43, 101, 0.1)')};
  border: ${({ variant }) => (variant === 'outlined-dark' ? `0.1rem solid ${Color.border}` : 'none')};
  color: ${({ variant }) => (variant === 'outlined-dark' ? Color.text2 : Color.text1)};
  border-radius: 1.6rem;
  padding: 3.4rem;
  font-size: 1.6rem;
  gap: ${({ gap }) => (gap ? `${gap}rem` : '1.6rem')};
  max-width: 100%;

    > a {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    > a > img,
    > img {
      --width: auto;
      --height: ${({ imageHeight }) => (imageHeight ? `${imageHeight}rem` : '5rem')};
      width: var(--width);
      height: var(--height);
      max-width: 100%;
      background: transparent;
      object-fit: contain;
      margin: 0 auto 0 0;
    }

    &.iconOnly > a > img,
    &.iconOnly > img {
      --width: auto;
      --height: ${({ imageHeight }) => (imageHeight ? `${imageHeight}rem` : '3rem')};
      width: var(--width);
      height: var(--height);
      margin: auto;
    }

    > h4 {
      font-size: 2.4rem;
      line-height: 1.2;
      font-weight: ${Font.weightBold};
      margin: 0;
      color: ${({ variant }) => (variant === 'outlined-dark' ? Color.lightBlue : Color.darkBlue)};
    }

    > span {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;
    }

    > p,
    > span > p {
      line-height: 1.3;
      text-align: ${({ textCentered }) => (textCentered ? 'center' : 'left')};
    }

    > span > a {
      color: ${Color.lightBlue};
    }
`

export const TopGradient = styled.div`
  background: url('/images/gradient.svg') no-repeat center/cover;
  filter: blur(10rem);
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  z-index: 0;
  opacity: 0.5;
`

export const SubTitle = styled.p<{ color?: string; maxWidth?: number; align?: string; lineHeight?: number; fontSize?: number; }>`
  display: inline-block;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : '2.2rem')};
  color: ${({ color }) => (color ? color : Color.text2)};
  font-weight: ${Font.weightNormal};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : 1.6)};
  text-align: ${({ align }) => (align ? align : 'center')};
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}rem`};
  margin: 0 auto;
  width: 100%;
  z-index: 1;

  ${Media.mediumDown} {
    font-size: 1.8rem;
    text-align: ${({ align }) => (align ? align : 'center')};
  }
`

export const SectionImage = styled.div<{
  hero?: boolean
  centerMobile?: boolean
  margin?: string
  height?: string
  width?: string
}>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  position: relative;
  z-index: 0;

  ${({ hero }) =>
    hero &&
    `
    margin: 0 0 0 9.6rem;

    ${Media.mobile} {
      margin: 4.2rem 0 9rem;;
    }
  `}

  ${Media.mediumDown} {
    /* height: initial; */

    ${({ centerMobile }) =>
      centerMobile &&
      `
      margin-left: auto;
      margin-right: auto;
    `}
  }

  > a > img,
  > img {
    object-fit: contain;
    width: 100%;
    height: inherit;
  }
`

export const Metrics = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: max-width;
  margin: 0 auto;
  justify-content: center;
  gap: 12rem;
  background: ${Color.darkBlue2};
  box-shadow: ${Defaults.boxShadow};
  padding: 4.2rem;
  border-radius: 1.2rem;
  justify-content: space-between;

  ${Media.mobile} {
    gap: 4rem;
  }

  > div {
    flex: 0 1 auto;
    justify-content: center;
    align-items: flex-start;
    display: flex;
    flex-flow: column wrap;
    gap: 1.6rem;

    ${Media.mobile} {
      width: 100%;
      align-items: center;
      gap: 2.4rem;
    }
  }

  > div > b {
    font-size: 6rem;
    font-weight: ${Font.weightNormal};
    background: ${Color.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &::selection {
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
    }

    ${Media.mediumDown} {
      font-size: 5rem;
    }

    ${Media.mobile} {
      text-align: center;
    }
  }

  > div > i {
    font-style: normal;
    font-size: 1.5rem;
    color: ${Color.text2};
  }
`

export const IconList = styled.ol`
  display: grid;
  max-width: 110rem;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 5.6rem auto 0;
  padding: 0;
  gap: 7rem 10rem;

  ${Media.mobile} {
    grid-template-columns: 1fr;
  }
`

export const IconListItem = styled.li<{ icon?: string }>`
  display: grid;
  grid-template-columns: 5.4rem 1fr;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: flex-start;

  ${Media.mobile} {
    display: flex;
  }

  &::before {
    ${({ icon }) =>
      icon &&
      `
      content: "";
      height: 3.6rem;
      width: 3.6rem;
      display: block;
      margin: -0.1rem 0 0;
      background: url(${icon}) no-repeat top/contain;

      ${Media.mobile} {
        margin: 0 auto 2.4rem;
      }
    `};
  }

  > span {
    display: flex;
    flex-flow: column wrap;
    flex: 1 1 auto;
    gap: 1.2rem;
  }

  > span > b {
    font-size: 2.8rem;
    line-height: 1.2;
    font-weight: ${Font.weightMedium};

    ${Media.mobile} {
      font-size: 2.6rem;
      text-align: center;
    }
  }

  > span > p {
    font-size: 1.8rem;
    line-height: 1.6;
    color: ${Color.text2};

    ${Media.mobile} {
      text-align: center;
    }
  }
`

export const CheckList = styled.ol`
  list-style-type: none;
  color: ${Color.text2};
  font-weight: ${Font.weightNormal};
  font-size: ${Font.sizeDefault};
  gap: 1.2rem;
  display: flex;
  flex-flow: column wrap;
  padding: 0;
  margin: 0;
  line-height: 1.2;

  > li {
    display: flex;
    font-size: inherit;
    align-items: center;
  }

  > li::before {
    content: '';
    display: inline-block;
    height: 2.4rem;
    width: 2.4rem;
    min-width: 2.4rem;
    background: url('/images/icons/check.svg') no-repeat center/contain;
    margin: 0 1rem 0 0;
  }
`

export const TrustedBy = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 5rem auto 3rem;
  border-top: 0.1rem solid ${Color.border};
  padding: 5rem 0 0;
  width: 100%;
  font-size: 3.2rem;
  color: ${Color.text1};
  font-weight: ${Font.weightNormal};

  ${Media.mobile} {
    flex-flow: column wrap;
    gap: 1.6rem;
    font-size: 2.6rem;
    text-align: center;
  }

  > p {
  }

  > ul {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    height: 5rem;
    width: 34rem;
    overflow: hidden;
    gap: 3rem;
    position: relative;

    ${Media.mobile} {
      width: 100%;
    }
  }

  > ul > li {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 2.6rem;
    color: ${Color.text1};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(-100%);
    animation: slide 9s ease 0s infinite normal forwards;
    opacity: 0;
    gap: 1.2rem;

    ${Media.mobile} {
      font-size: 1.8rem;
    }

  }

  > ul > li:nth-child(1) {
    animation-delay: 0s;
  }

  > ul > li:nth-child(2) {
    animation-delay: 3s;
  }

  > ul > li:nth-child(3) {
    animation-delay: 6s;
  }

  > ul > li > svg {
    display: flex;
    height: 100%;
    width: 100%;
    object-fit: contain;

      ${Media.mobile} {
        height: 70%;
        width: auto;
      }

      > g {
        fill: ${Color.darkBlue};
      }
  }

  > ul > li > strong {
    font-weight: ${Font.weightBold};
    white-space: nowrap;
    color: ${Color.darkBlue};
  }

  @keyframes slide {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    10% {
        transform: translateY(0%);
        opacity: 1;
    }
    30% {
        transform: translateY(0%);
        opacity: 1;
    }
    40% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}



`

// export const ApiWrapper = styled.div`
//   overflow: hidden;
//   max-width: 100%;
// `

// export const ApiTool = styled.div`
//   display: flex;
//   width: 100%;
//   flex-flow: column wrap;
//   background: black;
//   border: 0.1rem solid ${Color.border};
//   backdrop-filter: blur(6rem);
//   border-radius: 7rem;
//   padding: 2.4rem 4.8rem;
//   font-size: ${Font.sizeDefault};

//   ${Media.desktopOnly} {
//     border-radius: 3rem;
//     padding: 0 2.4rem 2.4rem;
//   }

//   ${Media.mobile} {
//     border-radius: 2rem;
//     padding: 0 2.4rem 2.4rem;
//   }

//   > h4 {
//     font-weight: ${Font.weightNormal};
//     font-size: 2.4rem;
//     line-height: 1;
//     color: ${Color.white}
//   }

//   > p {
//     line-height: 1.4;
//   }

//   pre {
//     max-width: 100%;
//   }
// `

// export const ApiParams = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   gap: 4rem;
//   margin: 1.6rem 0 4rem;

//   > span {
//     display: flex;
//     flex-flow: column wrap;
//   }

//   > span > b {
//     font-size: 2.8rem;
//     line-height: 1;
//     margin: 0 0 1rem;
//   }

//   > span > small {
//     font-size: 1.8rem;
//     line-height: 1;
//     color: ${transparentize(0.3, Color.text1)};
//   }
// `

// export const ApiCurlCommand = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   width: 100%;
//   border: 0.1rem solid ${Color.border};
//   padding: 0;
//   border-radius: 1.2rem;
//   gap: 0;
//   margin: 0 0 2.4rem;

//   ${Media.mobile} {
//     flex-flow: column wrap;
//     align-items: flex-start;
//     border: none;
//     padding: 0;
//     gap: 1rem;

//     pre {
//       margin: 0 !important;
//     }
//   }

//   > p {
//     display: inline-block;
//     line-height: 1.2;
//   }

//   > p > span {
//     color: ${Color.darkBlue};
//   }
// `

export const IntegrationList = styled.span`
  display: flex;
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;

  ${Media.mediumDown} {
    width: 100%;
  }

  > ol {
    margin: auto;
    padding: 0;
    display: grid;
    list-style: none;
    gap: 3rem;
    grid-template-columns: repeat(3, 1fr);

    ${Media.mediumDown} {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin: 0 auto 5.6rem;
    }
  }

  > ol > li {
    padding: 0;
    margin: 0;
    width: 12rem;
    height: 12rem;
    display: flex;

    ${Media.mobile} {
      width: 9rem;
      height: 9rem;
    }
  }

  > ol > li > a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    padding: 0;
    background: ${Color.darkBlue3};
    border-radius: 6rem;
    width: 100%;
    height: 100%;
    transition: transform 0.8s ease-in-out;

    ${Media.mobile} {
      border-radius: 4.5rem;
    }

    &:hover {
      transform: rotate(360deg);
    }

    > img {
      margin: auto;
      width: 100%;
      height: 100%;
      max-width: 65%;
      max-height: 65%;
    }
  }
`
