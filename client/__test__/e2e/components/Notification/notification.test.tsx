// TODO: add for different types test
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../../../../src/components/Notification';
import { NotificationStatus } from '../../../../src/utils/interfaces';

describe('Notification component', () => {
    it('renders notification with message and type', () => {
        const message = 'This is a notification';
        const type = NotificationStatus.Success;
        const closeButtonHandlerMock = jest.fn();
        const idx = 1;

        render(
            <Notification
                message={message}
                type={type}
                closeButtonHandler={closeButtonHandlerMock}
                idx={idx}
            />,
        );

        // Assert that the notification message is rendered
        expect(screen.getByText(message)).toBeInTheDocument();

        // Assert that the notification type is applied correctly
        const notificationBody = screen.getByTestId('notification-body');
        expect(notificationBody).toHaveStyle(`border-color: ${type};`);

        // Simulate clicking the close button
        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);

        // Assert that the close button handler is called with the correct index
        expect(closeButtonHandlerMock).toHaveBeenCalledWith(idx);
    });
});
