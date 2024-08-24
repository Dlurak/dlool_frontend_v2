type DownloadProps = {
	url: string;
	fileName: string;
};

export const downloadUrl = ({ url, fileName }: DownloadProps) => {
	const a = document.createElement('a');
	a.href = url;
	a.download = fileName;
	a.click();
};

export function asyncRequestAnimationFrame() {
	return new Promise<number>((resolve) => requestAnimationFrame(resolve));
}
