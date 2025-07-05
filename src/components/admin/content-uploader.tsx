
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Upload, Loader2, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updateContent } from '@/actions/update-content';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';

interface ContentUploaderProps {
  password: string;
}

export function ContentUploader({ password }: ContentUploaderProps) {
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [briefResumeFile, setBriefResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'content' | 'resume' | 'brief') => {
    const file = event.target.files?.[0] || null;
    if (fileType === 'content') setContentFile(file);
    if (fileType === 'resume') setResumeFile(file);
    if (fileType === 'brief') setBriefResumeFile(file);
  };

  const clearForm = (form: HTMLFormElement) => {
    form.reset();
    setContentFile(null);
    setResumeFile(null);
    setBriefResumeFile(null);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contentFile && !resumeFile && !briefResumeFile) return; 

    setIsUploading(true);
    const formData = new FormData(event.currentTarget);
    const result = await updateContent(formData);
    
    if (result.success) {
      toast({
        title: 'Upload Successful',
        description: result.message,
      });
      clearForm(event.currentTarget);
    } else {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: result.message,
      });
    }

    setIsUploading(false);
  };
  
  const hasFiles = contentFile || resumeFile || briefResumeFile;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} id="content-update-form">
        <input type="hidden" name="password" value={password} />
        
        <Card>
           <CardHeader>
            <CardTitle>Website Content</CardTitle>
            <CardDescription>
              To update site text, links, and settings, download the template, edit it, and upload it here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="secondary" type="button">
              <Link href="/portfolio-template.md" download>
                <Download className="mr-2 h-4 w-4" />
                Download Content Template
              </Link>
            </Button>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Content File (.md or .txt)</Label>
              <Input id="file-upload" name="file" type="file" accept=".md,.txt" onChange={(e) => handleFileChange(e, 'content')} disabled={isUploading} />
            </div>
            {contentFile && (
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{contentFile.name}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Separator className="my-6" />

        <Card>
          <CardHeader>
            <CardTitle>Resume / CV Files</CardTitle>
            <CardDescription>
              Upload your full and brief resume files in PDF format. This will replace any existing files on your site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="resume-upload">Full Resume/CV (.pdf)</Label>
              <Input id="resume-upload" name="resumeFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'resume')} disabled={isUploading} />
            </div>
             {resumeFile && (
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{resumeFile.name}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="brief-resume-upload">Brief Resume (.pdf)</Label>
              <Input id="brief-resume-upload" name="briefResumeFile" type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'brief')} disabled={isUploading} />
            </div>
             {briefResumeFile && (
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{briefResumeFile.name}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Finalize Changes</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-4">
              <div className="flex w-full items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                  <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                  <p>
                      <strong>Warning:</strong> Uploading files will overwrite the corresponding content or documents on your website. This action cannot be undone.
                  </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button type="button" className="w-full" disabled={isUploading || !hasFiles}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload and Update Content
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently overwrite the corresponding content on your website. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isUploading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" form="content-update-form" disabled={isUploading}>
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Yes, Overwrite Content"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
