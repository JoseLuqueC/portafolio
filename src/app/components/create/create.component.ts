import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2020,'','');
  }

  ngOnInit(): void {
  }

  onSubmit(projectFrom){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "No se prodrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Enviar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
    if (result.value) {
      //guardar los datos
      this._projectService.saveProject(this.project).subscribe(
        response =>{
            //subir la imagen
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((retult: any)=>{
              swalWithBootstrapButtons.fire(
                'Enviado!',
                'Se ha enviado con éxito',
                'success'
              )
              projectFrom.reset();
            });
        },
      error =>{
        console.log(<any>error);
        swalWithBootstrapButtons.fire(
          'Error',
          'No se ha podido guardar el formulario '+<any>error,
          'error'
        )
      }
    );
    }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha enviado el formulario',
          'error'
        )
      }
    })

    console.log(this.project);
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
