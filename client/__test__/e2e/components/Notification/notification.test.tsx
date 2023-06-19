// TODO: add for different types test
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { it, describe, expect, vitest } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../../../../src/components/Notification';
import { NotificationStatus } from '../../../../src/utils/interfaces';

describe('Notification component', () => {
    it('renders notification with message and type', () => {
        const message = 'This is a notification';
        const type = NotificationStatus.Success;
        const closeButtonHandlerMock = vitest.fn();
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
        const notificationBody = screen.getByRole('notification-body');
        console.log(notificationBody.getAttribute('type'));
        expect(notificationBody.getAttribute('type')).toBe(type.toString());
    });
});
