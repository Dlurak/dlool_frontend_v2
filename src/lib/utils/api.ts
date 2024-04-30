import { get } from "svelte/store";
import { svocal } from "./store/svocal";

export const getApibase = () => get(svocal("api.url"))
