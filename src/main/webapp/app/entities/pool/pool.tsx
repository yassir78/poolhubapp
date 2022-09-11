import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPool } from 'app/shared/model/pool.model';
import { getEntities } from './pool.reducer';

export const Pool = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const poolList = useAppSelector(state => state.pool.entities);
  const loading = useAppSelector(state => state.pool.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="pool-heading" data-cy="PoolHeading">
        <Translate contentKey="poolhubApp.pool.home.title">Pools</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="poolhubApp.pool.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/pool/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="poolhubApp.pool.home.createLabel">Create new Pool</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {poolList && poolList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="poolhubApp.pool.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.ref">Ref</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.label">Label</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.brand">Brand</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.stock">Stock</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.volume">Volume</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.width">Width</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.length">Length</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.height">Height</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.shape">Shape</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.material">Material</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="poolhubApp.pool.category">Category</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {poolList.map((pool, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/pool/${pool.id}`} color="link" size="sm">
                      {pool.id}
                    </Button>
                  </td>
                  <td>{pool.ref}</td>
                  <td>{pool.label}</td>
                  <td>{pool.brand}</td>
                  <td>{pool.description}</td>
                  <td>{pool.image}</td>
                  <td>{pool.price}</td>
                  <td>{pool.stock}</td>
                  <td>{pool.active ? 'true' : 'false'}</td>
                  <td>{pool.volume}</td>
                  <td>{pool.width}</td>
                  <td>{pool.length}</td>
                  <td>{pool.height}</td>
                  <td>
                    <Translate contentKey={`poolhubApp.Shape.${pool.shape}`} />
                  </td>
                  <td>
                    <Translate contentKey={`poolhubApp.Material.${pool.material}`} />
                  </td>
                  <td>
                    <Translate contentKey={`poolhubApp.Color.${pool.color}`} />
                  </td>
                  <td>
                    <Translate contentKey={`poolhubApp.Category.${pool.category}`} />
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/pool/${pool.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/pool/${pool.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/pool/${pool.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="poolhubApp.pool.home.notFound">No Pools found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Pool;
