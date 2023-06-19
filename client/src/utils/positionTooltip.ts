


export const positionTooltip = (tooltipmessage: HTMLElement, top?: number) => {
	const tooltip = tooltipmessage.children[1];

	let tipX: string | number = 'auto'; // 5px on the right of the ktooltip
	const tipY = top ? top : 20;

	const tooltip_rect = tooltip.getBoundingClientRect();
	// Corrections if out of window
	if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) // Out on the right
	{
		tipX = 20;  // Simulate a "right: tipX" position

	}

	// Apply corrected position
	(tooltip as HTMLElement).style.top = tipY + 'px';
	(tooltip as HTMLElement).style.right = tipX + 'px';
}