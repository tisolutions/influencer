import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Benefit, { schema } from './model'

const router = new Router()
const { description, title } = schema.tree

/**
 * @api {post} /benefits Create benefit
 * @apiName CreateBenefit
 * @apiGroup Benefit
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam description Benefit's description.
 * @apiParam title Benefit's title.
 * @apiSuccess {Object} benefit Benefit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Benefit not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ description, title }),
  create)

/**
 * @api {get} /benefits Retrieve benefits
 * @apiName RetrieveBenefits
 * @apiGroup Benefit
 * @apiUse listParams
 * @apiSuccess {Object[]} benefits List of benefits.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /benefits/:id Retrieve benefit
 * @apiName RetrieveBenefit
 * @apiGroup Benefit
 * @apiSuccess {Object} benefit Benefit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Benefit not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /benefits/:id Update benefit
 * @apiName UpdateBenefit
 * @apiGroup Benefit
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam description Benefit's description.
 * @apiParam title Benefit's title.
 * @apiSuccess {Object} benefit Benefit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Benefit not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ description, title }),
  update)

/**
 * @api {delete} /benefits/:id Delete benefit
 * @apiName DeleteBenefit
 * @apiGroup Benefit
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Benefit not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
