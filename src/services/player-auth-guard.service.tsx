export class PlayerAuthGuardService {

    // constructor( public playerServiceService: PlayerServiceService, private router: Router) {}

    // canActivate() {
    //     if (this.playerServiceService.getPlayer() instanceof Player) {
    //         return true;
    //     } else {
    //         if (localStorage.getItem('player')) {
    //             const localStorageUser =  JSON.parse(localStorage.getItem('player'));
    //             return this.playerServiceService.loginUser(localStorageUser.name).then( player => {
    //                 if ( player instanceof Player) {
    //                     return true;
    //                 }
    //             });
    //         } else {
    //             this.router.navigate(['/login']);
    //             return false;
    //         }
    //     }
    // }

}
