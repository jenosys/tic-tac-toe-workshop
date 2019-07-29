import React from 'react';
import { Navigation } from '@shopify/polaris';
import { GamesConsoleMajorTwotone, PopularMajorTwotone, CustomersMajorTwotone } from '@shopify/polaris-icons';

class SideMenuComp extends React.Component {
    private readonly items = [
        {
            url: '/game',
            label: '게임',
            icon: GamesConsoleMajorTwotone,
        },
        {
            url: '/monitoring',
            label: '모니터링',
            icon: PopularMajorTwotone,
            badge: '15',
        },
        {
            url: '/leaderboard',
            label: '리더보드',
            icon: CustomersMajorTwotone,
        },
    ];

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Navigation location="/">
                <Navigation.Section
                    title="GO"
                    items={this.items}
                />
            </Navigation>
        );
    }
}

export default SideMenuComp;