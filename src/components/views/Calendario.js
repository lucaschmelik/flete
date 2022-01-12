import React, { useState } from 'react'
import 'antd/dist/antd.css';
import '../css/index.css';
import { Calendar, Badge } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { Container, Button } from 'react-bootstrap'
import { Alert } from 'bootstrap';

export default function Calendario() {

    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 7:
                listData = [
                    { type: 'success', content: '4 viajes completados' }
                ];
                break;
            case 8:
                listData = [
                    { type: 'success', content: '2 viajes completados' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'success', content: '8 viajes completados' }
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: '5 viajes pendientes' },
                    { type: 'success', content: '4 viajes pendientes' }
                ];
                break;
        
            default:
        }
        return listData || [];
    }

    function onPanelChange(value, mode) {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Container>
            <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} locale={locale} />
            <Button variant="primary" type="submit" style={{float: 'right'}} >Siguiente</Button>
        </Container>
    );
}
