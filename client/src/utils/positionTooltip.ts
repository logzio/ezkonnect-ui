


export const positionTooltip = (tooltipmessage: HTMLElement, top?: number) => {
	// Get .ktooltiptext sibling
	const tooltip = tooltipmessage.children[1];

	// Get calculated ktooltip coordinates and size

	let tipX: string | number = 'auto'; // 5px on the right of the ktooltip
	const tipY = top ? top : 20;


	// Get calculated tooltip coordinates and size
	const tooltip_rect = tooltip.getBoundingClientRect();
	// Corrections if out of window
	if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) // Out on the right
	{

		tipX = 20;  // Simulate a "right: tipX" position

	}
	// if (tooltip_rect.y < 0)            // Out on the top
	// 	tipY = tipY - tooltip_rect.y;    // Align on the top

	// Apply corrected position
	tooltip.style.top = tipY + 'px';
	tooltip.style.right = tipX + 'px';
}