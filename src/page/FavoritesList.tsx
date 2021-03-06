import React, { Fragment, FunctionComponent } from 'react';

import { FavManagerProps } from '../component/FavManager';
import SessionTable from '../component/SessionTable';
import { Session, SessionList } from '../model/Session';
import { formatDate } from '../util/DateUtil';

export interface Props extends FavManagerProps {
    sessions: SessionList;
}

const FavoritesList: FunctionComponent<Props> = props => {
    const data = Session.partitionByDate(Object.values(props.favorites));
    const dates = Object.keys(data).sort();

    if (!dates.length) {
        return <Fragment>Aktuell sind keine Favoriten ausgewählt.</Fragment>;
    }

    return (
        <Fragment>
            {dates.map(datum => (
                <Fragment key={datum}>
                    <h3>{formatDate(datum)}</h3>
                    <SessionTable {...props} sessions={data[datum]} />
                </Fragment>
            ))}
        </Fragment>
    );
};

export default FavoritesList;
