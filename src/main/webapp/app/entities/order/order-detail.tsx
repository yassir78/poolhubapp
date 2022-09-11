import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="poolhubApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="ref">
              <Translate contentKey="poolhubApp.order.ref">Ref</Translate>
            </span>
          </dt>
          <dd>{orderEntity.ref}</dd>
          <dt>
            <span id="sum">
              <Translate contentKey="poolhubApp.order.sum">Sum</Translate>
            </span>
          </dt>
          <dd>{orderEntity.sum}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="poolhubApp.order.date">Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.date ? <TextFormat value={orderEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="poolhubApp.order.state">State</Translate>
            </span>
          </dt>
          <dd>{orderEntity.state}</dd>
          <dt>
            <Translate contentKey="poolhubApp.order.pool">Pool</Translate>
          </dt>
          <dd>{orderEntity.pool ? orderEntity.pool.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
