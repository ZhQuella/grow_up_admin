import { unref } from "vue";
import { DataUri } from '@antv/x6';

export const useEvent = ({
    graphExample
}) => {

    const onHandleCenter = () => {
        const graph = unref(graphExample);
        graph.centerContent();
    }

    const onHandleClean = () => {
        const graph = unref(graphExample);
        graph.clearCells();
    }

    const onHandleUndo = () => {
        const graph = unref(graphExample);
        graph.undo();
    }

    const onHandleRedo = () => {
        const graph = unref(graphExample);
        graph.redo();
    }

    const onHandleSaveImage = () => {
        const graph = unref(graphExample);
        graph.toJPEG((dataUri: string) => {
            DataUri.downloadDataUri(dataUri, 'chartx.jpeg');
        }, {
            backgroundColor: 'white',
            padding: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            quality: 1
        });
    }

    return {
        onHandleCenter,
        onHandleClean,
        onHandleUndo,
        onHandleRedo,
        onHandleSaveImage
    }
}
