class Room {
    constructor(number, type, price){
        this.number = number;
        this.type = type;
        this.price = price;
        this.isAvailable = true;
    }
    // booking the room
    bookRoom(){
        if(this.isAvailable){
            this.isAvailable = false
            return true;
        }
        return false;
    }
    // cancel the reservation
    cancelBooking(){
        if(!this.isAvailable) 
        {
            this.isAvailable = true;
            return true;
        }
        return false
    }
}
class Hotel {
    constructor(name){
        this.name  = name;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room)
    }

    getAvailableRooms(){
        return this.rooms.filter(room => room.isAvailable)
    }

    findAvailableRoom(type){
       return this.getAvailableRooms().find(room => room.type === type);
    }
}

class Reservation {
    constructor(hotel){
        this.hotel = hotel;
        this.reservations =  [];
    }

    makeReservation(type){
        const room = this.hotel.findAvailableRoom(type);
        if(room){
            if(room.bookRoom()){
                this.reservations.push(room);
                return `Room ${room.number} booked successful!`
            }
        }
        return 'No available rooms of this type';
    }

    cancelReservation(roomNumber){
        const room = this.reservations.find(room => room.number === roomNumber);
        console.log('room',room)
        if (room) {
            if(room.cancelBooking()){ 
                this.reservations = this.reservations.filter(room => room.number !== roomNumber);
                return `Reservation for room ${room.number} cancelled.`
            }
        }
        return 'Reservation not found';
    }

    viewReservations(){
        if(this.reservations.length === 0){
            return 'No current reservations.'
        }   
        return this.reservations.map(r =>`Room: #${r.number}, Type: ${r.type}, Price: $${r.price}`).join('\n');
    }
}

class RoomManger {
    constructor(hotel){
        this.hotel= hotel;
    }
    displayAvailableRooms(){
        const availableRooms = this.hotel.getAvailableRooms();
        if(availableRooms.length === 0){
            return 'No available Rooms'
        }
        return availableRooms.map(room=> `Room: #${room.number}, Type: ${room.type}, Price: $${room.price}`).join('\n')
    }
}

const hotel = new Hotel('Grand Hotel');
hotel.addRoom(new Room(101,"single",100));
hotel.addRoom(new Room(102,"single",100));
hotel.addRoom(new Room(103,"single",100));
hotel.addRoom(new Room(104,"double",200));
hotel.addRoom(new Room(105,"double",200));
hotel.addRoom(new Room(106,"double",200));
hotel.addRoom(new Room(107,"suite",400));
hotel.addRoom(new Room(108,"suite",400));
hotel.addRoom(new Room(109,"suite",400));

const reservation = new Reservation(hotel);

const roomManger = new RoomManger(hotel)

const updateReservationList = () =>{
    const reservationList = document.getElementById("reservation-list");
    reservationList.textContent = reservation.viewReservations();
}

const updateAvailableRooms = () =>{
    const availableRooms = document.getElementById('available-rooms');
    availableRooms.textContent = roomManger.displayAvailableRooms();
}

document.getElementById('booking-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const roomType = document.getElementById('room-type').value.split(' - ')[0];
    const result = reservation.makeReservation(roomType);
    alert(result)
    updateAvailableRooms()
    updateReservationList()
})

document.getElementById('cancellation-form').addEventListener('submit',(event) =>{
    event.preventDefault();
    const roomNumber = Number(document.getElementById("room-number").value)
    console.log('room #',roomNumber)
    const result = reservation.cancelReservation(roomNumber);
    console.log('result',result)
    alert(result);
    updateAvailableRooms();
    updateReservationList();
});

updateAvailableRooms();
updateReservationList();
