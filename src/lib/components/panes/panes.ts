import { calculatePercentage } from '$lib/utils/math/percentages';
import { clamp } from '$lib/utils/numbers/clamp';

const isTouchEvent = (e: Event): e is TouchEvent => 'touches' in e;

interface Props {
	setPos: (p: number) => void;
	getPos: () => number;
	setShowSideBar: (show: boolean) => void;
	setPercentages: (p: number) => void;
	min: number;
	max: number;
}

export const handleMouseDownOrTouchStart =
	({ setPos, getPos, setShowSideBar, setPercentages, min, max }: Props) =>
	(e: MouseEvent | TouchEvent) => {
		let isDragging = true;
		let initialPosition = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
		let percentage = 0;

		const handleMouseMoveOrTouchMove = (e: MouseEvent | TouchEvent) => {
			if (!isDragging) return;

			const { clientX } = isTouchEvent(e) ? e.touches[0] : e;
			const delta = clientX - initialPosition;
			const potentialPos = getPos() + delta;

			if (potentialPos <= min) {
				percentage = clamp(
					0,
					calculatePercentage((potentialPos - min) * -1, ((min - min / 3) / 5) * 4),
					100
				);
				setPercentages(percentage);
				return setPos(min);
			}
			percentage = 0;
			setPercentages(percentage);
			if (potentialPos >= max) return setPos(max);

			setPos(potentialPos);
			initialPosition = clientX;
		};

		const handleMouseUpOrTouchEnd = () => {
			document.removeEventListener('mousemove', handleMouseMoveOrTouchMove);
			document.removeEventListener('touchmove', handleMouseMoveOrTouchMove);
			document.removeEventListener('mouseup', handleMouseUpOrTouchEnd);
			document.removeEventListener('touchend', handleMouseUpOrTouchEnd);
			isDragging = false;
			if (percentage >= 70) setShowSideBar(false);

			const intervalId = setInterval(() => {
				percentage = Math.max(percentage - 2, 0);
				setPercentages(percentage);
				if (percentage <= 0) clearInterval(intervalId);
			}, 2);
		};

		document.addEventListener('mousemove', handleMouseMoveOrTouchMove);
		document.addEventListener('touchmove', handleMouseMoveOrTouchMove);
		document.addEventListener('mouseup', handleMouseUpOrTouchEnd);
		document.addEventListener('touchend', handleMouseUpOrTouchEnd);
	};
