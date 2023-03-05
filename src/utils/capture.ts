import { toBlob, toPng } from 'html-to-image';

export const captureAndShare = async <T extends HTMLElement>(
  node: T,
  fileName?: string,
) => {
  try {
    const blob = await toBlob(node);
    if (blob) {
      const files = [
        new File([blob], `${fileName ?? 'image'}.png`, {
          type: blob.type,
          lastModified: new Date().getTime(),
        }),
      ];
      if (navigator.share) {
        navigator.share({ files });
      } else {
        const url = await toPng(node);
        const link = document.createElement('a');
        if (typeof link.download === 'string') {
          link.href = url;
          link.download = `${fileName ?? 'image'}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(url);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
