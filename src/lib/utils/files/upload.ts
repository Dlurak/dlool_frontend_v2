import type { ZodSchema } from 'zod';

interface ReadFileProps {
	filetype?: string;
}

export function readFile(props: ReadFileProps = {}): Promise<string> {
	return new Promise((resolve, reject) => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		if (props.filetype) fileInput.accept = props.filetype;

		fileInput.addEventListener('change', (event) => {
			const fileList = (event.target as HTMLInputElement).files;
			if (!fileList || fileList.length === 0) {
				reject(new Error('No file selected.'));
				return;
			}

			const file = fileList[0];
			const reader = new FileReader();

			reader.onload = () => {
				const fileContent = reader.result;
				if (!fileContent) return reject(new Error('Error reading file.'));

				resolve(fileContent.toString());
			};

			reader.onerror = () => {
				reject(new Error('Error reading file.'));
			};

			reader.readAsText(file);
		});

		fileInput.click();
	});
}

export async function readJSON<T>(schema: ZodSchema<T>) {
	const text = await readFile({ filetype: 'application/json' });
	const json = JSON.parse(text);
	return schema.parse(json);
}
