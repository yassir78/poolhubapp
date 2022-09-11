import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './pool.reducer';

export const PoolDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const poolEntity = useAppSelector(state => state.pool.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="poolDetailsHeading">
          <Translate contentKey="poolhubApp.pool.detail.title">Pool</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{poolEntity.id}</dd>
          <dt>
            <span id="ref">
              <Translate contentKey="poolhubApp.pool.ref">Ref</Translate>
            </span>
          </dt>
          <dd>{poolEntity.ref}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="poolhubApp.pool.label">Label</Translate>
            </span>
          </dt>
          <dd>{poolEntity.label}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="poolhubApp.pool.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{poolEntity.brand}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="poolhubApp.pool.description">Description</Translate>
            </span>
          </dt>
          <dd>{poolEntity.description}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="poolhubApp.pool.image">Image</Translate>
            </span>
          </dt>
          <dd>{poolEntity.image}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="poolhubApp.pool.price">Price</Translate>
            </span>
          </dt>
          <dd>{poolEntity.price}</dd>
          <dt>
            <span id="stock">
              <Translate contentKey="poolhubApp.pool.stock">Stock</Translate>
            </span>
          </dt>
          <dd>{poolEntity.stock}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="poolhubApp.pool.active">Active</Translate>
            </span>
          </dt>
          <dd>{poolEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="volume">
              <Translate contentKey="poolhubApp.pool.volume">Volume</Translate>
            </span>
          </dt>
          <dd>{poolEntity.volume}</dd>
          <dt>
            <span id="width">
              <Translate contentKey="poolhubApp.pool.width">Width</Translate>
            </span>
          </dt>
          <dd>{poolEntity.width}</dd>
          <dt>
            <span id="length">
              <Translate contentKey="poolhubApp.pool.length">Length</Translate>
            </span>
          </dt>
          <dd>{poolEntity.length}</dd>
          <dt>
            <span id="height">
              <Translate contentKey="poolhubApp.pool.height">Height</Translate>
            </span>
          </dt>
          <dd>{poolEntity.height}</dd>
          <dt>
            <span id="shape">
              <Translate contentKey="poolhubApp.pool.shape">Shape</Translate>
            </span>
          </dt>
          <dd>{poolEntity.shape}</dd>
          <dt>
            <span id="material">
              <Translate contentKey="poolhubApp.pool.material">Material</Translate>
            </span>
          </dt>
          <dd>{poolEntity.material}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="poolhubApp.pool.color">Color</Translate>
            </span>
          </dt>
          <dd>{poolEntity.color}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="poolhubApp.pool.category">Category</Translate>
            </span>
          </dt>
          <dd>{poolEntity.category}</dd>
        </dl>
        <Button tag={Link} to="/pool" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pool/${poolEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PoolDetail;
