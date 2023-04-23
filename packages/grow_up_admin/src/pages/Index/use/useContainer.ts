import { scrollEvent } from "types/eleOther";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

export const useContainer = () => {
  const opacityNum = ref(0);
  const { t } = useI18n();

  const isShowBorder = computed(() => {
    return opacityNum.value >= 0.8;
  });

  const onPageContentScroll = (event: scrollEvent) => {
    const top = event.scrollTop;
    const opacity = Math.min(4, top / 100);
    opacityNum.value = opacity;
  };

  const traitIntroduces = computed(() => {
    return [
      {
        emjo: "💡",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.0.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.0.DESCRIBE")
      },
      {
        emjo: "⚡️",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.1.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.1.DESCRIBE")
      },
      {
        emjo: "🔧",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.2.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.2.DESCRIBE")
      },
      {
        emjo: "📦",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.3.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.3.DESCRIBE")
      },
      {
        emjo: "🏭",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.4.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.4.DESCRIBE")
      },
      {
        emjo: "🔩",
        title: t("INDEX_SYETEM_DESCRIBE.TRAIT.5.TITLE"),
        detail: t("INDEX_SYETEM_DESCRIBE.TRAIT.5.DESCRIBE")
      }
    ];
  });

  return {
    onPageContentScroll,
    isShowBorder,
    opacityNum,
    traitIntroduces
  };
};
