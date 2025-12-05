export async function compressImage(file, maxSize = 400) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxSize / Math.max(img.width, img.height);
  
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          0.8
        );
      };
    });
  }
  