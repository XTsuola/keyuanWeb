export type BMapGLApi = {
    Map: new (container: string | HTMLElement) => unknown;
    Point: new (lng: number, lat: number) => unknown;
    Marker: new (point: unknown, opts?: object) => unknown;
    Icon: new (url: string, size: unknown, opts?: object) => unknown;
    Size: new (width: number, height: number) => unknown;
    InfoWindow: new (content: string, opts?: object) => unknown;
    DistrictLayer: new (opts: object) => unknown;
};

const BMAP_AK = "MW6x5hgC4ysrYpbprm6N2HYDiDwfzSND";
const SCRIPT_ID = "bmap-gl-script";

let loading: Promise<BMapGLApi> | null = null;

function getBMapGL(): BMapGLApi | null {
    const api = window.BMapGL as BMapGLApi | undefined;
    return api?.Map ? api : null;
}

export function loadBMapGL(): Promise<BMapGLApi> {
    const existing = getBMapGL();
    if (existing) return Promise.resolve(existing);
    if (loading) return loading;

    loading = new Promise((resolve, reject) => {
        const done = () => {
            const api = getBMapGL();
            if (api) {
                resolve(api);
                return;
            }
            loading = null;
            reject(new Error("百度地图加载失败"));
        };

        const prev = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (prev) {
            prev.addEventListener("load", done, { once: true });
            prev.addEventListener("error", () => {
                loading = null;
                reject(new Error("百度地图脚本加载失败"));
            }, { once: true });
            return;
        }

        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=${BMAP_AK}&services=&t=${Date.now()}`;
        script.onload = done;
        script.onerror = () => {
            loading = null;
            script.remove();
            reject(new Error("百度地图脚本加载失败"));
        };
        document.head.appendChild(script);
    });

    return loading;
}
