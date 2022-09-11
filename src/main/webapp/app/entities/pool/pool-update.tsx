import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPool } from 'app/shared/model/pool.model';
import { Shape } from 'app/shared/model/enumerations/shape.model';
import { Material } from 'app/shared/model/enumerations/material.model';
import { Color } from 'app/shared/model/enumerations/color.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { getEntity, updateEntity, createEntity, reset } from './pool.reducer';

export const PoolUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const poolEntity = useAppSelector(state => state.pool.entity);
  const loading = useAppSelector(state => state.pool.loading);
  const updating = useAppSelector(state => state.pool.updating);
  const updateSuccess = useAppSelector(state => state.pool.updateSuccess);
  const shapeValues = Object.keys(Shape);
  const materialValues = Object.keys(Material);
  const colorValues = Object.keys(Color);
  const categoryValues = Object.keys(Category);

  const handleClose = () => {
    navigate('/pool');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...poolEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          shape: 'RECTANGULAR',
          material: 'WOOD',
          color: 'BLUE',
          category: 'INGROUND',
          ...poolEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="poolhubApp.pool.home.createOrEditLabel" data-cy="PoolCreateUpdateHeading">
            <Translate contentKey="poolhubApp.pool.home.createOrEditLabel">Create or edit a Pool</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="pool-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('poolhubApp.pool.ref')}
                id="pool-ref"
                name="ref"
                data-cy="ref"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('poolhubApp.pool.label')}
                id="pool-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('poolhubApp.pool.brand')} id="pool-brand" name="brand" data-cy="brand" type="text" />
              <ValidatedField
                label={translate('poolhubApp.pool.description')}
                id="pool-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField label={translate('poolhubApp.pool.image')} id="pool-image" name="image" data-cy="image" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.price')} id="pool-price" name="price" data-cy="price" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.stock')} id="pool-stock" name="stock" data-cy="stock" type="text" />
              <ValidatedField
                label={translate('poolhubApp.pool.active')}
                id="pool-active"
                name="active"
                data-cy="active"
                check
                type="checkbox"
              />
              <ValidatedField label={translate('poolhubApp.pool.volume')} id="pool-volume" name="volume" data-cy="volume" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.width')} id="pool-width" name="width" data-cy="width" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.length')} id="pool-length" name="length" data-cy="length" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.height')} id="pool-height" name="height" data-cy="height" type="text" />
              <ValidatedField label={translate('poolhubApp.pool.shape')} id="pool-shape" name="shape" data-cy="shape" type="select">
                {shapeValues.map(shape => (
                  <option value={shape} key={shape}>
                    {translate('poolhubApp.Shape.' + shape)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('poolhubApp.pool.material')}
                id="pool-material"
                name="material"
                data-cy="material"
                type="select"
              >
                {materialValues.map(material => (
                  <option value={material} key={material}>
                    {translate('poolhubApp.Material.' + material)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField label={translate('poolhubApp.pool.color')} id="pool-color" name="color" data-cy="color" type="select">
                {colorValues.map(color => (
                  <option value={color} key={color}>
                    {translate('poolhubApp.Color.' + color)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('poolhubApp.pool.category')}
                id="pool-category"
                name="category"
                data-cy="category"
                type="select"
              >
                {categoryValues.map(category => (
                  <option value={category} key={category}>
                    {translate('poolhubApp.Category.' + category)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/pool" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PoolUpdate;
