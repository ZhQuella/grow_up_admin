import { ref, onMounted, computed, watch } from "vue";

export const useWerterMark = () => { 
  const werterMarkRef = ref();

  const mackValue = computed(() => {
    return "人力资源二部 李二狗"
  });

  const initWerterImage = ():string => {
    const oCanvasDom = document.createElement("canvas");
    oCanvasDom.width = 150;
    oCanvasDom.height = 150;
    const context = oCanvasDom.getContext("2d");
    context.rotate((-15 * Math.PI) / 180);
    context.fillStyle = "rgba(200, 200, 200, 0.25)";
    context.textAlign = "left";
    context.font = "14px Verdana";
    context.fillText(mackValue.value, 75, 75);
    context.fillText(mackValue.value, -70, 36);
    
    context.fillText(mackValue.value, -55, 120);
    context.fillText(mackValue.value, 89, 160);
    const base64 = oCanvasDom.toDataURL("image/png");
    return base64;
  };

  const drawWerter = () => { 
    const imageUrl = initWerterImage();
    werterMarkRef.value.style = `background-image: url(${imageUrl});`;
  };

  watch(() => mackValue.value, drawWerter);

  onMounted(() => {
    drawWerter();
  });

  return {
    werterMarkRef
  }
};
