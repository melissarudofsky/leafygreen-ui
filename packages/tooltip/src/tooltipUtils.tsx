import { css } from '@leafygreen-ui/emotion';

export function trianglePosition(
  alignment: string,
  justification: string,
  triggerRect: DOMRect | ClientRect | null,
) {
  if (!alignment || !justification || !triggerRect) {
    return '';
  }

  const borderOffset = 'calc(100% - 1px)';

  const containerSize = 15;
  const notchSize = 8;
  const containerOffsetX = (triggerRect.width - containerSize) / 2;
  const containerOffsetY = (triggerRect.height - containerSize) / 2;
  const notchOverlap = -notchSize / 2;

  type Styles = 'left' | 'right' | 'top' | 'bottom' | 'margin';
  const notchStyleObj: { [K in Styles]?: string } = {};
  const containerStyleObj: { [K in Styles]?: string } = {};

  switch (alignment) {
    case 'top':
    case 'bottom':
      notchStyleObj.left = '0px';
      notchStyleObj.right = '0px';

      if (alignment === 'top') {
        containerStyleObj.top = `${borderOffset}`;
        notchStyleObj.top = `${notchOverlap}px`;
      } else {
        containerStyleObj.bottom = `${borderOffset}`;
        notchStyleObj.bottom = `${notchOverlap}px`;
      }

      switch (justification) {
        case 'left':
          containerStyleObj.left = `${containerOffsetX}px`;
          break;

        case 'center-horizontal':
          containerStyleObj.left = '0px';
          containerStyleObj.right = '0px';
          break;

        case 'right':
          containerStyleObj.right = `${containerOffsetX}px`;
          break;
      }

      break;

    case 'left':
    case 'right':
      notchStyleObj.top = '0px';
      notchStyleObj.bottom = '0px';

      if (alignment === 'left') {
        notchStyleObj.left = `${notchOverlap}px`;

        // right align is .8px off, factoring that in here to correct offset
        containerStyleObj.left = `calc(100% - 1.8px)`;
      } else {
        notchStyleObj.right = `${notchOverlap}px`;
        containerStyleObj.right = `${borderOffset}`;
      }

      switch (justification) {
        case 'top':
          containerStyleObj.top = `${containerOffsetY}px`;
          break;

        case 'center-vertical':
          containerStyleObj.top = '0px';
          containerStyleObj.bottom = '0px';
          break;

        case 'bottom':
          containerStyleObj.bottom = `${containerOffsetY}px`;
          break;
      }

      break;
  }

  return {
    containerStyle: css`
      position: absolute;
      width: ${containerSize}px;
      height: ${containerSize}px;
      overflow: hidden;
      margin: auto;
      ${css(containerStyleObj)};
    `,
    notchStyle: css`
      ${css(notchStyleObj)};
      position: absolute;
      transform: rotate(45deg);
      width: 8px;
      height: 8px;
      margin: auto;
    `,
  };
}
