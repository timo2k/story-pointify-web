export function generateDinoImageLink(dino: string): string {
    switch (dino) {
        case 'Abelisaurus':
            return '/images/dinos/abelisaurus.jpg'
        case 'Euoplocephalus':
            return '/images/dinos/euoplocephalus.jpg'
        case 'Liliensternus':
            return '/images/dinos/liliensternus.jpg'
        case 'Troodon':
            return '/images/dinos/troodon.jpg'
        case 'Ultrasauros':
            return '/images/dinos/ultrasauros.jpg'
        case 'Coelophysis':
            return '/images/dinos/coelophysis.jpg'
        case 'Gallimimus':
            return '/images/dinos/gallimimus.jpg'
        case 'Halticosaurus':
            return '/images/dinos/halticosaurus.jpg'
        case 'Daemonosaurus':
            return '/images/dinos/daemonosaurus.jpg'
        case 'Dilophosaurus':
            return '/images/dinos/dilophosaurus.jpg'
        case 'Magyarosaurus':
            return '/images/dinos/magyarosaurus.jpg'
        default:
            return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
    }
}