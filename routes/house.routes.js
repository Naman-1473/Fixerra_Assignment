import {Router} from "express";
import { setHouse,getHouse,getHouses } from "../controllers/house.controller.js";

const router = Router()

router.route( "/sethouse" ).post( setHouse )
router.route( "/house" ).get(  getHouse )
router.route( "/houses" ).get(  getHouses )

export default router